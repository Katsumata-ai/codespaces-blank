// Page Explorer pour Startup - Dafnck Army
// New military-inspired design with blue/white theme
class StartupExplorerPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Explorer - Dafnck Army';
        this.userCampaigns = [];
        this.availableCampaigns = [];
        this.sidebar = new StartupSidebar();
    }

    async render() {
        const userCampaigns = this.getUserCampaignsCount();

        return `
            <div class="startup-layout" data-component="StartupExplorerPage">
                <!-- Sidebar Navigation -->
                ${await this.sidebar.render()}

                <!-- Main Content Area -->
                <div class="startup-main">
                    <!-- Page Header -->
                    ${this.renderPageHeader()}

                    <!-- Page Content -->
                    <main class="startup-content">
                        ${userCampaigns === 0 ? this.renderExplorerEmpty() : this.renderExplorerWithCampaigns()}
                    </main>
                </div>
            </div>
        `;
    }
    
    renderPageHeader() {
        return `
            <header class="startup-header">
                <div class="startup-header-content">
                    <div>
                        <h1 class="startup-header-title">Explorer</h1>
                        <p class="startup-header-subtitle">Découvrez et gérez vos campagnes marketing</p>
                    </div>

                    <div style="display: flex; align-items: center; gap: 16px;">
                        <button class="btn btn-primary" data-action="create-campaign">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            Nouvelle Campagne
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    renderExplorerEmpty() {
        return `
            <div class="card" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <div class="card-content" style="padding: 48px 24px;">
                    <div style="width: 64px; height: 64px; background-color: var(--army-blue-ultra-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--army-blue-dark)" stroke-width="2">
                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                        </svg>
                    </div>
                    <h2 style="font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--gray-900); margin-bottom: 12px;">
                        Bienvenue dans Dafnck Army !
                    </h2>
                    <p style="color: var(--gray-600); margin-bottom: 32px; font-size: var(--text-base);">
                        Créez votre première campagne marketing et mobilisez une armée de créateurs talentueux
                    </p>
                    <button class="btn btn-primary btn-lg" data-action="create-campaign">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Créer ma première campagne
                    </button>
                </div>
            </div>
        `;
    }

    renderExplorerWithCampaigns() {
        return `
            <div style="max-width: 1200px; margin: 0 auto;">
                <!-- Ma Campagne Section -->
                <div class="card mb-6">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 class="card-title">Ma Campagne</h3>
                            <p class="card-subtitle">Gérez et suivez votre campagne active</p>
                        </div>
                        <button class="btn btn-secondary btn-sm" data-action="view-analytics">
                            Voir Analytics
                        </button>
                    </div>
                    <div class="card-content">
                        ${this.renderUserCampaign()}
                    </div>
                </div>

                <!-- Campagnes Publiques Section -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Campagnes Publiques</h3>
                        <p class="card-subtitle">Découvrez d'autres campagnes pour inspiration</p>
                    </div>
                    <div class="card-content">
                        ${this.renderPublicCampaigns()}
                    </div>
                </div>
            </div>
        `;
    }

    renderUserCampaign() {
        // Simuler une campagne utilisateur
        return `
            <div class="grid grid-cols-4 gap-6 mb-6">
                <div class="card" style="text-align: center; padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: var(--green-100); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">1,247</div>
                    <div class="text-sm text-gray-500">Vues Totales</div>
                </div>
                <div class="card" style="text-align: center; padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: var(--blue-100); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">8</div>
                    <div class="text-sm text-gray-500">Créateurs Actifs</div>
                </div>
                <div class="card" style="text-align: center; padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: var(--yellow-100); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-600)" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">3j</div>
                    <div class="text-sm text-gray-500">Temps Restant</div>
                </div>
                <div class="card" style="text-align: center; padding: 24px;">
                    <div style="width: 48px; height: 48px; background-color: var(--army-blue-ultra-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--army-blue-dark)" stroke-width="2">
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
                        </svg>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">€1,250</div>
                    <div class="text-sm text-gray-500">Budget Restant</div>
                </div>
            </div>
        `;
    }

    renderPublicCampaigns() {
        // Simuler des campagnes publiques pour démonstration
        const demoCampaigns = [
            {
                title: "Lancement App Fitness",
                company: "FitTech Pro",
                cpm: "€2.50",
                budget: "€5,000",
                creators: 12,
                deadline: "5 jours"
            },
            {
                title: "Promotion E-commerce Mode",
                company: "StyleHub",
                cpm: "€3.20",
                budget: "€8,500",
                creators: 18,
                deadline: "8 jours"
            },
            {
                title: "Campagne SaaS B2B",
                company: "CloudSync",
                cpm: "€4.00",
                budget: "€12,000",
                creators: 25,
                deadline: "12 jours"
            }
        ];

        return `
            <div class="grid grid-cols-3 gap-6">
                ${demoCampaigns.map(campaign => `
                    <div class="card" style="transition: box-shadow var(--transition-normal);">
                        <div class="card-content">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                                <h4 style="font-size: var(--text-lg); font-weight: var(--font-semibold); color: var(--gray-900); margin: 0;">
                                    ${campaign.title}
                                </h4>
                                <span class="badge badge-info">${campaign.deadline}</span>
                            </div>
                            <p style="color: var(--gray-600); font-size: var(--text-sm); margin-bottom: 16px;">
                                ${campaign.company}
                            </p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--gray-500); margin-bottom: 4px;">CPM</div>
                                    <div style="font-weight: var(--font-semibold); color: var(--army-blue-dark);">${campaign.cpm}</div>
                                </div>
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--gray-500); margin-bottom: 4px;">Budget</div>
                                    <div style="font-weight: var(--font-semibold); color: var(--gray-900);">${campaign.budget}</div>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: var(--text-sm); color: var(--gray-600);">
                                    ${campaign.creators} créateurs actifs
                                </span>
                                <button class="btn btn-secondary btn-sm" disabled>
                                    Démo
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Helper methods
    getUserCampaignsCount() {
        try {
            const campaigns = JSON.parse(localStorage.getItem('user_campaigns') || '[]');
            return campaigns.length;
        } catch {
            return 0;
        }
    }

    async init() {
        // Initialize sidebar
        await this.sidebar.init();

        // Handle action buttons
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                e.preventDefault();
                this.handleAction(action.dataset.action);
            }
        });
    }

    handleAction(action) {
        switch (action) {
            case 'create-campaign':
                this.router.navigate('/campaign/create');
                break;
            case 'view-analytics':
                this.router.navigate('/analytics');
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }
}

console.log('🔧 Startup Explorer Page loaded');
