console.log('🔧 Simple app loaded');

// Application simple pour tester
class SimpleDafnckApp {
    constructor() {
        console.log('🚀 Simple app constructor');
        this.router = null;
        this.init();
    }
    
    init() {
        console.log('🔧 Initializing simple app...');

        try {
            // Créer le router
            this.router = new Router();
            window.router = this.router;

            console.log('✅ Router created');

            // Le router gère déjà la navigation initiale vers la page actuelle
            // Pas besoin de forcer une redirection vers la landing page

            console.log('✅ Simple app initialized');
        } catch (error) {
            console.error('❌ Error in init:', error);
        }
    }
}

// Définir les classes manquantes temporairement
class AuthCallbackPage extends BaseComponent {
    async render() {
        return `<div class="auth-callback-page"><p>Connexion en cours...</p></div>`;
    }
}

class CreatePage extends BaseComponent {
    async render() {
        return `<div class="create-page"><h1>Créer</h1><p>Page en cours de développement...</p></div>`;
    }
}

class ActivitiesPage extends BaseComponent {
    async render() {
        return `<div class="activities-page"><h1>Activités</h1><p>Page en cours de développement...</p></div>`;
    }
}

class BudgetPage extends BaseComponent {
    async render() {
        return `<div class="budget-page"><h1>Budget</h1><p>Page en cours de développement...</p></div>`;
    }
}

class CampaignDetailPage extends BaseComponent {
    async render() {
        return `<div class="campaign-detail-page"><h1>Détail Campagne</h1><p>ID: ${this.params.id}</p></div>`;
    }
}

class SubmissionDetailPage extends BaseComponent {
    async render() {
        return `<div class="submission-detail-page"><h1>Détail Soumission</h1><p>ID: ${this.params.id}</p></div>`;
    }
}

// Rendre les classes disponibles globalement pour le router
console.log('🔧 Setting global classes...');
window.LandingPage = LandingPage;
window.RoleSelectionPage = RoleSelectionPage;
window.AuthPage = AuthPage;
window.AuthCallbackPage = AuthCallbackPage;

window.OnboardingStripePage = OnboardingStripePage;
window.ExplorerPage = ExplorerPage;
window.StartupSidebar = StartupSidebar;
window.StartupExplorerPage = StartupExplorerPage;
window.StartupMetricsPage = StartupMetricsPage;
window.StartupSubmissionsPage = StartupSubmissionsPage;
window.CampaignCreatePage = CampaignCreatePage;
window.CreatePage = CreatePage;
window.ActivitiesPage = ActivitiesPage;
window.BudgetPage = BudgetPage;
window.ProfilePage = ProfilePage;
window.CampaignDetailPage = CampaignDetailPage;
window.SubmissionDetailPage = SubmissionDetailPage;
console.log('✅ Global classes set successfully');

console.log('🔧 Simple app script completed');

// Vérifier l'état du DOM
console.log('🔧 Document ready state:', document.readyState);

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    console.log('🔧 DOM is loading, adding event listener...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔧 DOM ready, creating simple app...');
        try {
            window.dafnckApp = new SimpleDafnckApp();
        } catch (error) {
            console.error('❌ Error creating app:', error);
        }
    });
} else {
    console.log('🔧 DOM already ready, creating simple app immediately...');
    try {
        window.dafnckApp = new SimpleDafnckApp();
    } catch (error) {
        console.error('❌ Error creating app:', error);
    }
}
