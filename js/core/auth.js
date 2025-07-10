// Gestionnaire d'authentification Supabase pour Dafnck Army
class AuthManager {
    constructor() {
        this.supabase = null;
        this.state = window.appState;
        this.lastAuthEvent = null;
        this.authEventTimeout = null;
        this.init();
    }

    async init() {
        // Attendre que Supabase soit initialisé
        await this.waitForSupabase();

        // Écouter les changements d'authentification
        this.supabase.auth.onAuthStateChange((event, session) => {
            console.log('🔐 Auth state changed:', event, session?.user?.email);
            this.handleAuthStateChange(event, session);
        });

        // Vérifier la session actuelle
        await this.checkSession();
    }

    async waitForSupabase() {
        // Attendre que Supabase soit disponible
        let attempts = 0;
        const maxAttempts = 50; // 5 secondes max

        while (!window.supabaseClient && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (window.supabaseClient) {
            this.supabase = window.supabaseClient;
            console.log('✅ AuthManager connected to Supabase');
        } else {
            console.error('❌ AuthManager: Timeout waiting for Supabase initialization');
            throw new Error('Supabase not available');
        }
    }
    
    async handleAuthStateChange(event, session) {
        // Protection contre les multiples déclenchements rapides
        const eventKey = `${event}_${session?.user?.id || 'anonymous'}`;
        const now = Date.now();

        if (this.lastAuthEvent === eventKey && this.authEventTimeout) {
            clearTimeout(this.authEventTimeout);
        }

        this.lastAuthEvent = eventKey;

        // Débounce les événements d'authentification pour éviter les boucles
        this.authEventTimeout = setTimeout(async () => {
            switch (event) {
                case 'SIGNED_IN':
                    // Détecter si c'est un signup en vérifiant si l'utilisateur vient d'être créé
                    const isNewUser = session?.user?.created_at &&
                        (new Date() - new Date(session.user.created_at)) < 60000; // Moins d'1 minute
                    const context = isNewUser ? 'signup' : 'signin';
                    await this.handleSignIn(session, context);
                    break;
                case 'SIGNED_OUT':
                    this.handleSignOut();
                    break;
                case 'TOKEN_REFRESHED':
                    console.log('🔄 Token refreshed - no action needed');
                    // Ne pas déclencher de redirection pour les rafraîchissements de token
                    break;
                case 'INITIAL_SESSION':
                    // Session initiale lors du chargement de page - pas de redirection
                    console.log('🔄 Initial session detected - no redirect');
                    break;
            }
        }, 100); // Attendre 100ms pour éviter les multiples déclenchements
    }
    
    async handleSignIn(session, context = 'signin') {
        const user = session.user;

        // Récupérer les données utilisateur complètes
        const userData = await this.fetchUserData(user.id);

        this.state.setState({
            user: userData,
            isAuthenticated: true,
            userRole: userData?.role || null,
            stripeOnboarded: userData?.stripe_onboarded || false
        });

        // Redirection intelligente uniquement pour les changements d'état d'authentification
        // (pas pour les rechargements de page)
        this.handleAuthRedirect(userData, context);
    }
    
    handleSignOut() {
        // Nettoyer toutes les données de brouillon pour la sécurité
        if (window.OnboardingProfilePage) {
            window.OnboardingProfilePage.clearAllDraftData();
        }

        this.state.reset();

        // Redirection automatique vers la landing page après déconnexion
        console.log('🔄 User signed out, redirecting to landing page');
        window.router?.navigate('/');
    }
    
    async fetchUserData(userId) {
        try {
            // Fetch user data from users table
            const { data: userData, error: userError } = await this.supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (userError) {
                console.warn('User data not found in database, creating profile...');
                return await this.createUserProfile(userId);
            }

            // Determine which profile table to check based on user role
            let profileData = null;
            let profileError = null;

            if (userData.role === 'startup') {
                const { data, error } = await this.supabase
                    .from('startup_profiles')
                    .select('*')
                    .eq('id', userId)
                    .maybeSingle(); // Use maybeSingle() instead of single() to handle no results
                profileData = data;
                profileError = error;
            } else if (userData.role === 'creator') {
                const { data, error } = await this.supabase
                    .from('creator_profiles')
                    .select('*')
                    .eq('id', userId)
                    .maybeSingle(); // Use maybeSingle() instead of single() to handle no results
                profileData = data;
                profileError = error;
            }

            console.log('🔧 Profile lookup:', {
                userId,
                userRole: userData.role,
                profileFound: !!profileData,
                profileCompleted: profileData?.profile_completed,
                profileError: profileError?.code
            });

            // Combine user and profile data
            const combinedData = {
                ...userData,
                profile_completed: profileData?.profile_completed || false,
                profile_data: profileData
            };

            return combinedData;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
    
    async createUserProfile(userId) {
        const { data: authUser } = await this.supabase.auth.getUser();
        
        const newUser = {
            id: userId,
            email: authUser.user.email,
            role: null, // À définir lors de l'onboarding
            stripe_account_id: null,
            stripe_onboarded: false,
            created_at: new Date().toISOString()
        };
        
        try {
            const { data, error } = await this.supabase
                .from('users')
                .insert(newUser)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating user profile:', error);
            return newUser; // Retourner les données même si l'insertion échoue
        }
    }
    
    handleAuthRedirect(userData, context = 'signin') {
        const currentPath = window.location.hash.substring(1) || window.location.pathname;

        console.log('🔄 Auth redirect logic:', {
            context,
            currentPath,
            userRole: userData?.role,
            profileCompleted: userData?.profile_completed
        });

        // UNIQUEMENT rediriger lors d'un signup ou signin explicite
        // PAS lors de la restauration de session (rechargement de page)
        if (context === 'session_restore') {
            console.log('✅ Session restore - no redirect, staying on current page');
            return;
        }

        // Ne pas rediriger si l'utilisateur est sur la landing page (sauf signup)
        if (context !== 'signup' && (currentPath === '/' || currentPath === '')) {
            console.log('✅ User on landing page, staying put');
            return;
        }

        // Ne pas rediriger si l'utilisateur est déjà sur une page appropriée
        // sauf si c'est un signup (toujours rediriger après signup)
        if (context !== 'signup') {
            const validPages = ['/explorer', '/analytics', '/metrics', '/submissions', '/budget', '/profile', '/campaign'];
            if (validPages.some(page => currentPath.startsWith(page))) {
                console.log('✅ User already on valid page, staying put');
                return;
            }
        }

        // Si l'utilisateur n'a pas de rôle, rediriger vers la sélection de rôle
        if (!userData?.role) {
            console.log('🔄 No role defined, redirecting to role selection');
            window.router?.navigate('/role-selection');
            return;
        }

        // Si le profil n'est pas complet, rediriger vers l'onboarding
        if (!userData?.profile_completed) {
            console.log('🔄 Profile incomplete, redirecting to onboarding');
            window.router?.navigate('/onboarding/profile');
            return;
        }

        // UNIQUEMENT rediriger vers explorer lors d'un signup ou signin explicite
        // ET seulement si l'utilisateur n'est pas déjà sur une page valide
        const validStartupPages = ['/explorer', '/analytics', '/videos', '/metrics'];
        const isOnValidPage = validStartupPages.some(page => currentPath.startsWith(page));

        if ((context === 'signup' || context === 'signin') && !isOnValidPage) {
            console.log('🔄 Explicit auth action, redirecting to explorer');
            window.router?.navigate('/explorer');
        } else {
            console.log('✅ No redirect needed, staying on current page');
        }
    }
    
    async checkSession() {
        try {
            const { data: { session }, error } = await this.supabase.auth.getSession();

            if (error) {
                console.error('Error checking session:', error);
                return false;
            }

            if (session) {
                // Pour checkSession (rechargement de page), ne pas déclencher de redirection
                await this.handleSessionRestore(session);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Session check failed:', error);
            return false;
        }
    }

    async handleSessionRestore(session) {
        const user = session.user;

        // Récupérer les données utilisateur complètes
        const userData = await this.fetchUserData(user.id);

        this.state.setState({
            user: userData,
            isAuthenticated: true,
            userRole: userData?.role || null,
            stripeOnboarded: userData?.stripe_onboarded || false
        });

        // Pas de redirection lors de la restauration de session (rechargement de page)
        console.log('✅ Session restored, staying on current page');

        // Ne pas appeler handleAuthRedirect pour éviter les redirections automatiques
        // lors du rechargement de page
    }
    
    // Méthodes d'authentification
    async signUp(email, password, userData = {}) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            });
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }
    
    async signIn(email, password) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }
    
    async signInWithOAuth(provider) {
        try {
            const { data, error } = await this.supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('OAuth sign in error:', error);
            return { success: false, error: error.message };
        }
    }
    
    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }
    
    async updateUserRole(role) {
        const user = this.state.getState('user');
        if (!user) return { success: false, error: 'No user logged in' };
        
        try {
            const { data, error } = await this.supabase
                .from('users')
                .update({ role })
                .eq('id', user.id)
                .select()
                .single();
            
            if (error) throw error;
            
            this.state.setState({
                user: data,
                userRole: role
            });
            
            return { success: true, data };
        } catch (error) {
            console.error('Update role error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Getters
    get isAuthenticated() {
        return this.state.getState('isAuthenticated');
    }
    
    get user() {
        return this.state.getState('user');
    }
    
    get userRole() {
        return this.state.getState('userRole');
    }
}

// Instance globale
window.authManager = new AuthManager();

console.log('🔧 Auth Manager initialized - SMART UX REDIRECTS ENABLED');
