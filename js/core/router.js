// Router SPA pour Dafnck Army
class Router {
    constructor() {
        this.routes = new Map();
        this.middlewares = [];
        this.currentRoute = null;
        this.currentComponent = null;
        this.state = window.appState;
        this.auth = window.authManager;
        this.redirectCount = 0;
        this.maxRedirects = 5;

        this.init();
    }
    
    init() {
        // Gestion des événements de navigation
        window.addEventListener('popstate', (e) => this.handlePopState(e));
        window.addEventListener('hashchange', (e) => this.handleHashChange(e));
        document.addEventListener('click', (e) => this.handleLinkClick(e));

        // Définir les routes
        this.defineRoutes();

        // Navigation initiale
        const hash = window.location.hash;
        const path = hash ? hash.substring(1) : window.location.pathname;
        this.navigate(path, false);
    }
    
    defineRoutes() {
        // Routes publiques
        this.addRoute('/', LandingPage);
        this.addRoute('/role-selection', RoleSelectionPage);
        this.addRoute('/auth', AuthPage);
        this.addRoute('/auth/callback', AuthCallbackPage);

        // Routes d'onboarding (authentification requise)
        this.addRoute('/onboarding/profile', OnboardingProfilePage, {
            requiresAuth: true,
            requiresRole: true
        });
        
        // Routes principales (authentification + onboarding complet requis)
        this.addRoute('/explorer', StartupExplorerPage, {
            requiresAuth: true,
            requiresOnboarding: true,
            allowedRoles: [] // Temporairement : accepter tous les rôles
        });
        this.addRoute('/analytics', StartupAnalyticsPage, {
            requiresAuth: true,
            requiresOnboarding: true,
            allowedRoles: [] // Temporairement : accepter tous les rôles
        });
        this.addRoute('/videos', StartupVideosPage, {
            requiresAuth: true,
            requiresOnboarding: true,
            allowedRoles: [] // Temporairement : accepter tous les rôles
        });
        this.addRoute('/metrics', StartupMetricsPage, {
            requiresAuth: true,
            requiresOnboarding: true,
            allowedRoles: [] // Temporairement : accepter tous les rôles
        });
        this.addRoute('/submissions', StartupSubmissionsPage, {
            requiresAuth: true,
            requiresOnboarding: true,
            allowedRoles: [] // Temporairement : accepter tous les rôles
        });
        this.addRoute('/campaign/create', CampaignCreatePage, {
            requiresAuth: true,
            requiresOnboarding: true,
            allowedRoles: [] // Temporairement : accepter tous les rôles
        });

        this.addRoute('/create', CreatePage, { 
            requiresAuth: true,
            requiresOnboarding: true 
        });
        this.addRoute('/activities', ActivitiesPage, { 
            requiresAuth: true,
            requiresOnboarding: true 
        });
        this.addRoute('/budget', BudgetPage, { 
            requiresAuth: true,
            requiresOnboarding: true 
        });
        this.addRoute('/profile', ProfilePage, { 
            requiresAuth: true,
            requiresOnboarding: true 
        });
        
        // Routes dynamiques
        this.addRoute('/campaigns/:id', CampaignDetailPage, { 
            requiresAuth: true,
            requiresOnboarding: true 
        });
        this.addRoute('/submissions/:id', SubmissionDetailPage, { 
            requiresAuth: true,
            requiresOnboarding: true 
        });
    }
    
    addRoute(path, component, options = {}) {
        this.routes.set(path, {
            component,
            requiresAuth: options.requiresAuth || false,
            requiresRole: options.requiresRole || false,
            requiresOnboarding: options.requiresOnboarding || false,
            allowedRoles: options.allowedRoles || [],
            middleware: options.middleware || []
        });
    }
    
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
    }
    
    async navigate(path, pushState = true) {
        // console.log('🧭 Navigating to:', path); // Commenté pour réduire les logs

        // Protection contre les boucles de redirection
        if (this.currentRoute === path) {
            this.redirectCount++;
            if (this.redirectCount > this.maxRedirects) {
                // Réduire le spam de logs - ne logger qu'une fois
                if (this.redirectCount === this.maxRedirects + 1) {
                    console.warn('🔄 Redirect loop detected, stopping navigation to:', path);
                }
                return;
            }
        } else {
            this.redirectCount = 0;
        }

        // Exécuter les middlewares globaux
        for (const middleware of this.middlewares) {
            const result = await middleware(path);
            if (result === false) {
                console.log('🚫 Navigation blocked by middleware');
                return;
            }
        }
        
        // Ignore anchor links (they're handled by the browser)
        if (path.startsWith('#')) {
            console.log('🔗 Ignoring anchor link:', path);
            return;
        }

        const route = this.matchRoute(path);
        if (!route) {
            console.warn('❌ Route not found:', path);
            // Éviter la boucle infinie en redirigeant vers la page d'accueil
            if (path !== '/') {
                this.navigate('/');
            }
            return;
        }
        
        // Vérifications d'accès
        const accessCheck = await this.checkAccess(route, path);
        if (!accessCheck.allowed) {
            console.log('🚫 Access denied, redirecting to:', accessCheck.redirect);
            // Éviter la boucle infinie
            if (accessCheck.redirect !== path) {
                this.navigate(accessCheck.redirect);
            }
            return;
        }

        // Gestion des redirections
        if (route.options && route.options.redirect) {
            console.log('🔄 Redirecting from', path, 'to', route.options.redirect);
            this.navigate(route.options.redirect, pushState);
            return;
        }

        // Mettre à jour l'URL
        if (pushState) {
            // Si le path commence par /, utiliser le hash routing
            if (path.startsWith('/') && path !== '/') {
                window.location.hash = path;
            } else {
                history.pushState({ path }, '', path);
            }
        }
        
        // Mettre à jour l'état
        this.state.setState({
            previousRoute: this.currentRoute,
            currentRoute: path
        });
        
        // Rendre le composant
        await this.renderComponent(route.component, path, route.params);
        this.currentRoute = path;
    }
    
    async checkAccess(route, path) {
        const user = this.state.getState('user');
        const isAuthenticated = this.state.getState('isAuthenticated');
        const userRole = this.state.getState('userRole');
        const stripeOnboarded = this.state.getState('stripeOnboarded');
        
        // Vérification authentification
        if (route.requiresAuth && !isAuthenticated) {
            return { allowed: false, redirect: '/auth' };
        }
        
        // Vérification rôle défini
        if (route.requiresRole && !userRole) {
            return { allowed: false, redirect: '/' };
        }
        
        // Vérification rôles autorisés
        if (route.allowedRoles.length > 0 && !route.allowedRoles.includes(userRole)) {
            // Éviter la boucle infinie : si on est déjà sur /explorer et qu'on n'a pas le bon rôle,
            // rediriger vers la page d'accueil ou onboarding
            if (path === '/explorer') {
                return { allowed: false, redirect: '/' };
            }
            return { allowed: false, redirect: '/explorer' };
        }
        
        // Vérification onboarding complet
        const profileCompleted = user?.profile_completed;
        const onboardingCompleted = window.appState?.getState('onboardingCompleted');

        // Debug access check (commenté pour réduire les logs)
        // console.log('🔍 Access check:', {
        //     userRole,
        //     profileCompleted,
        //     onboardingCompleted,
        //     requiresOnboarding: route.requiresOnboarding
        // });

        // Vérification onboarding (temporairement désactivé)
        // if (route.requiresOnboarding && (!userRole || (!profileCompleted && !onboardingCompleted))) {
        //     if (!userRole) {
        //         return { allowed: false, redirect: '/onboarding/role' };
        //     }
        //     if (!profileCompleted && !onboardingCompleted) {
        //         return { allowed: false, redirect: '/onboarding/profile' };
        //     }
        // }
        
        return { allowed: true };
    }
    
    matchRoute(path) {
        // Séparer le path des query parameters
        const [pathname] = path.split('?');

        // Recherche exacte d'abord
        if (this.routes.has(pathname)) {
            return { ...this.routes.get(pathname), params: {} };
        }

        // Recherche avec paramètres dynamiques
        for (const [pattern, route] of this.routes) {
            const regex = this.pathToRegex(pattern);
            const match = pathname.match(regex);

            if (match) {
                const params = this.extractParams(pattern, match);
                return { ...route, params };
            }
        }

        return null;
    }
    
    pathToRegex(path) {
        const escaped = path.replace(/\//g, '\\/');
        const withParams = escaped.replace(/:(\w+)/g, '([^/]+)');
        return new RegExp(`^${withParams}$`);
    }
    
    extractParams(pattern, match) {
        const paramNames = pattern.match(/:(\w+)/g) || [];
        const params = {};
        
        paramNames.forEach((param, index) => {
            const paramName = param.substring(1); // Enlever le ':'
            params[paramName] = match[index + 1];
        });
        
        return params;
    }
    
    async renderComponent(ComponentClass, path, params = {}) {
        const app = document.getElementById('app');
        
        // Cleanup du composant précédent
        if (this.currentComponent && this.currentComponent.destroy) {
            this.currentComponent.destroy();
        }
        
        // Afficher le loading
        this.state.setState({ loading: true });
        
        try {
            // Instancier le nouveau composant
            this.currentComponent = new ComponentClass(params);
            
            // Rendre le composant
            const html = await this.currentComponent.render();
            app.innerHTML = html;
            
            // Initialiser les event listeners du composant
            if (this.currentComponent.init) {
                await this.currentComponent.init();
            }
            
            // Mettre à jour le titre de la page
            if (this.currentComponent.title) {
                document.title = `${this.currentComponent.title} - Dafnck Army`;
            }
            
        } catch (error) {
            console.error('Error rendering component:', error);
            app.innerHTML = `
                <div class="error-page">
                    <h1>Erreur</h1>
                    <p>Une erreur est survenue lors du chargement de la page.</p>
                    <button onclick="window.location.reload()">Recharger</button>
                </div>
            `;
        } finally {
            this.state.setState({ loading: false });
        }
    }
    
    handlePopState(event) {
        const hash = window.location.hash;
        const path = hash ? hash.substring(1) : window.location.pathname;
        this.navigate(path, false);
    }

    handleHashChange(event) {
        const hash = window.location.hash;
        const path = hash ? hash.substring(1) : '/';
        this.navigate(path, false);
    }
    
    handleLinkClick(event) {
        // Vérifier si c'est un lien interne
        const link = event.target.closest('a[href]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Ignorer les liens externes et les liens avec target="_blank"
        if (href.startsWith('http') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') ||
            link.target === '_blank') {
            return;
        }
        
        // Ignorer si Ctrl/Cmd + click
        if (event.ctrlKey || event.metaKey) return;
        
        event.preventDefault();
        this.navigate(href);
    }
    
    // Méthodes utilitaires
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    goBack() {
        history.back();
    }
    
    goForward() {
        history.forward();
    }
    
    reload() {
        window.location.reload();
    }
}

// Instance globale - sera initialisée par l'app principale
window.router = null;

console.log('🔧 Router loaded');
