console.log('🔧 Starting app.js execution...');

// Application principale Dafnck Army
class DafnckApp {
    constructor() {
        this.supabase = window.supabaseClient;
        this.state = window.appState;
        this.auth = window.authManager;
        this.router = null; // Sera initialisé dans init()

        this.init();
    }
    
    async init() {
        console.log('🚀 Initializing Dafnck Army...');

        try {
            // Initialiser le router en premier
            this.initializeRouter();

            // Tester la connexion Supabase en arrière-plan
            this.testConnections();

            // Initialiser les composants globaux
            await this.initializeComponents();

            // Vérifier la session utilisateur
            await this.checkUserSession();

            console.log('✅ Dafnck Army initialized successfully');

        } catch (error) {
            console.error('❌ Failed to initialize Dafnck Army:', error);
            this.showError('Erreur lors de l\'initialisation de l\'application');
        }
    }
    
    initializeRouter() {
        console.log('🔧 Initializing Router...');

        // Créer l'instance du router
        window.router = new Router();
        this.router = window.router;

        console.log('✅ Router initialized');
    }

    async testConnections() {
        console.log('🔍 Testing connections...');

        try {
            // Test Supabase
            const supabaseTest = await window.testSupabaseConnection();
            if (!supabaseTest.connected) {
                console.warn('⚠️ Supabase connection failed, continuing anyway');
                return;
            }

            console.log('✅ Supabase connected:', supabaseTest);
        } catch (error) {
            console.warn('⚠️ Connection test failed:', error);
        }
    }
    
    async initializeComponents() {
        // Initialiser les composants globaux
        window.notificationManager = new NotificationManager();
        window.modalManager = new ModalManager();
        
        // Écouter les changements d'état pour les notifications
        this.state.subscribe('user', (user) => {
            if (user) {
                this.showNotification(`Bienvenue ${user.email} !`, 'success');
            }
        });
        
        // Écouter les erreurs globales
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.showNotification('Une erreur inattendue s\'est produite', 'error');
        });
        
        // Écouter les erreurs de promesses non gérées
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.showNotification('Erreur de connexion', 'error');
        });
    }
    
    async checkUserSession() {
        // La vérification de session est gérée par AuthManager
        // Ici on peut ajouter de la logique supplémentaire si nécessaire
        const isAuthenticated = this.state.getState('isAuthenticated');
        
        if (isAuthenticated) {
            console.log('👤 User session found');
        } else {
            console.log('👤 No user session');
        }
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Petit délai pour une transition fluide
        }
    }
    
    showError(message) {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="error-page">
                <div class="error-content">
                    <div class="error-icon">⚠️</div>
                    <h1>Erreur d'initialisation</h1>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        Recharger l'application
                    </button>
                </div>
            </div>
        `;
        
        this.hideLoadingScreen();
    }
    
    showNotification(message, type = 'info') {
        if (window.notificationManager) {
            window.notificationManager.show(message, type);
        }
    }
}

// Classes utilitaires manquantes pour que l'app fonctionne
class NotificationManager {
    constructor() {
        this.container = document.getElementById('notification-container');
        this.notifications = [];
    }
    
    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        this.container.appendChild(notification);
        this.notifications.push(notification);
        
        // Auto-remove après la durée spécifiée
        setTimeout(() => {
            this.remove(notification);
        }, duration);
        
        return notification;
    }
    
    remove(notification) {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOut 300ms ease-in forwards';
            setTimeout(() => {
                notification.remove();
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            }, 300);
        }
    }
    
    clear() {
        this.notifications.forEach(notification => this.remove(notification));
    }
}

class ModalManager {
    constructor() {
        this.container = document.getElementById('modal-container');
        this.activeModal = null;
    }
    
    show(content, options = {}) {
        this.hide(); // Fermer le modal actuel s'il y en a un
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Fermer">&times;</button>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => this.hide());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.hide();
        });
        
        this.container.appendChild(modal);
        this.activeModal = modal;
        
        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';
        
        return modal;
    }
    
    hide() {
        if (this.activeModal) {
            this.activeModal.remove();
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }
}

// Pages temporaires pour que le router fonctionne
class AuthPage extends BaseComponent {
    async render() {
        return `
            <div class="auth-page" data-component="AuthPage">
                <div class="auth-container">
                    <h1>Authentification</h1>
                    <p>Page d'authentification en cours de développement...</p>
                    <button class="btn btn-primary" onclick="window.router.navigate('/')">
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        `;
    }
}

class AuthCallbackPage extends BaseComponent {
    async render() {
        return `
            <div class="auth-callback-page" data-component="AuthCallbackPage">
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Connexion en cours...</p>
                </div>
            </div>
        `;
    }
}



class OnboardingStripePage extends BaseComponent {
    async render() {
        return `
            <div class="onboarding-page" data-component="OnboardingStripePage">
                <h1>Configuration Stripe</h1>
                <p>Configuration Stripe en cours de développement...</p>
            </div>
        `;
    }
}

class ExplorerPage extends BaseComponent {
    async render() {
        return `
            <div class="explorer-page" data-component="ExplorerPage">
                <h1>Explorer les campagnes</h1>
                <p>Page explorer en cours de développement...</p>
            </div>
        `;
    }
}

class DashboardPage extends BaseComponent {
    async render() {
        return `
            <div class="dashboard-page" data-component="DashboardPage">
                <h1>Dashboard Startup</h1>
                <p>Dashboard en cours de développement...</p>
            </div>
        `;
    }
}

class CreatePage extends BaseComponent {
    async render() {
        return `
            <div class="create-page" data-component="CreatePage">
                <h1>Créer</h1>
                <p>Page de création en cours de développement...</p>
            </div>
        `;
    }
}

class ActivitiesPage extends BaseComponent {
    async render() {
        return `
            <div class="activities-page" data-component="ActivitiesPage">
                <h1>Mes Activités</h1>
                <p>Page d'activités en cours de développement...</p>
            </div>
        `;
    }
}

class BudgetPage extends BaseComponent {
    async render() {
        return `
            <div class="budget-page" data-component="BudgetPage">
                <h1>Budget & Paiements</h1>
                <p>Page budget en cours de développement...</p>
            </div>
        `;
    }
}

class ProfilePage extends BaseComponent {
    async render() {
        return `
            <div class="profile-page" data-component="ProfilePage">
                <h1>Profil</h1>
                <p>Page profil en cours de développement...</p>
            </div>
        `;
    }
}

class CampaignDetailPage extends BaseComponent {
    async render() {
        return `
            <div class="campaign-detail-page" data-component="CampaignDetailPage">
                <h1>Détail Campagne</h1>
                <p>Campagne ID: ${this.params.id}</p>
            </div>
        `;
    }
}

class SubmissionDetailPage extends BaseComponent {
    async render() {
        return `
            <div class="submission-detail-page" data-component="SubmissionDetailPage">
                <h1>Détail Soumission</h1>
                <p>Soumission ID: ${this.params.id}</p>
            </div>
        `;
    }
}

// Rendre les classes disponibles globalement pour le router
window.LandingPage = LandingPage;
window.AuthPage = AuthPage;
window.AuthCallbackPage = AuthCallbackPage;

window.OnboardingStripePage = OnboardingStripePage;
window.ExplorerPage = ExplorerPage;
window.DashboardPage = DashboardPage;
window.CreatePage = CreatePage;
window.ActivitiesPage = ActivitiesPage;
window.BudgetPage = BudgetPage;
window.ProfilePage = ProfilePage;
window.CampaignDetailPage = CampaignDetailPage;
window.SubmissionDetailPage = SubmissionDetailPage;

console.log('🔧 Dafnck App loaded');

// Test simple
try {
    console.log('🔧 Testing app initialization...');

    // Initialiser l'application quand le DOM est prêt
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔧 DOM Content Loaded, initializing app...');
        try {
            window.dafnckApp = new DafnckApp();
        } catch (error) {
            console.error('❌ Error creating DafnckApp:', error);
        }
    });
} catch (error) {
    console.error('❌ Error in app.js:', error);
}
