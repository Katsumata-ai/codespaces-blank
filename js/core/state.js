// Gestion d'état centralisée pour Dafnck Army
class AppState {
    constructor() {
        this.state = {
            // Utilisateur
            user: null,
            isAuthenticated: false,
            userRole: null, // 'startup' | 'creator' | null
            
            // Navigation
            currentRoute: '/',
            previousRoute: null,
            
            // Données
            campaigns: [],
            submissions: [],
            userCampaigns: [],
            userSubmissions: [],
            
            // UI
            loading: false,
            notifications: [],
            modals: {
                auth: false,
                campaignDetail: false,
                onboarding: false
            },
            
            // Onboarding
            onboardingStep: null,
            stripeOnboarded: false,
            
            // Filters & Search
            campaignFilters: {
                search: '',
                cpmMin: null,
                cpmMax: null,
                category: null,
                status: 'active'
            }
        };
        
        this.subscribers = new Map();
        this.init();
    }
    
    init() {
        // Charger l'état depuis localStorage si disponible
        this.loadFromStorage();
        
        // Sauvegarder automatiquement les changements
        this.subscribe('user', () => this.saveToStorage());
        this.subscribe('userRole', () => this.saveToStorage());
        this.subscribe('stripeOnboarded', () => this.saveToStorage());
        this.subscribe('onboardingCompleted', () => this.saveToStorage());
    }
    
    // Subscription système
    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, []);
        }
        this.subscribers.get(key).push(callback);
        
        // Retourner fonction de désabonnement
        return () => {
            const callbacks = this.subscribers.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }
    
    // Mise à jour d'état
    setState(updates) {
        const oldState = { ...this.state };
        
        // Appliquer les mises à jour
        Object.keys(updates).forEach(key => {
            if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
                // Merge pour les objets
                this.state[key] = { ...this.state[key], ...updates[key] };
            } else {
                // Remplacement direct pour les primitives et arrays
                this.state[key] = updates[key];
            }
        });
        
        // Notifier les subscribers
        Object.keys(updates).forEach(key => {
            if (this.subscribers.has(key)) {
                this.subscribers.get(key).forEach(callback => {
                    callback(this.state[key], oldState[key]);
                });
            }
        });
        
        // Debug en développement
        if (window.location.hostname === 'localhost') {
            console.log('🔄 State updated:', updates);
        }
    }
    
    // Récupération d'état
    getState(key) {
        return key ? this.state[key] : { ...this.state };
    }
    
    // Sauvegarde localStorage
    saveToStorage() {
        const persistentState = {
            user: this.state.user,
            userRole: this.state.userRole,
            stripeOnboarded: this.state.stripeOnboarded,
            isAuthenticated: this.state.isAuthenticated,
            onboardingCompleted: this.state.onboardingCompleted
        };
        
        try {
            localStorage.setItem('dafnck_army_state', JSON.stringify(persistentState));
        } catch (error) {
            console.warn('Failed to save state to localStorage:', error);
        }
    }
    
    // Chargement localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('dafnck_army_state');
            if (saved) {
                const persistentState = JSON.parse(saved);
                this.setState(persistentState);
            }
        } catch (error) {
            console.warn('Failed to load state from localStorage:', error);
        }
    }
    
    // Réinitialisation
    reset() {
        this.state = {
            ...this.state,
            user: null,
            isAuthenticated: false,
            userRole: null,
            campaigns: [],
            submissions: [],
            userCampaigns: [],
            userSubmissions: [],
            stripeOnboarded: false,
            onboardingStep: null
        };
        
        localStorage.removeItem('dafnck_army_state');
    }

    async setOnboardingCompleted(completed = true) {
        this.setState({ onboardingCompleted: completed });
    }
}

// Instance globale
window.appState = new AppState();

console.log('🔧 App State initialized');
