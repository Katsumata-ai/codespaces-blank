// Page Analytics pour Startup - Dafnck Army
// Interface optimisée avec métriques, gestion créateurs et campagne
class StartupAnalyticsPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Analytics - Dafnck Army';
        this.sidebar = new StartupSidebar();
        this.campaignData = null;
        this.metrics = {
            views: 0,
            videos: 0,
            likes: 0,
            comments: 0,
            engagementRate: 0
        };
        this.creators = [];
        this.inviteLink = '';
    }

    async render() {
        return `
            <div class="startup-layout" data-component="StartupAnalyticsPage">
                <!-- Sidebar Navigation -->
                ${await this.sidebar.render()}

                <!-- Main Content Area -->
                <div class="startup-main">
                    <!-- Page Header -->
                    ${this.renderPageHeader()}

                    <!-- Page Content -->
                    <main class="startup-content">
                        ${this.renderAnalyticsContent()}
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
                        <h1 class="startup-header-title">Analytics</h1>
                        <p class="startup-header-subtitle">Suivez les performances de votre campagne en temps reel</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <button class="btn btn-secondary" data-action="refresh-data">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                <path d="M21 3v5h-5"/>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                <path d="M3 21v-5h5"/>
                            </svg>
                            Actualiser
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    renderAnalyticsContent() {
        return `
            <div class="analytics-container">
                <!-- Section principale : Métriques et Aperçu Campagne -->
                <div class="analytics-main-section">
                    <!-- Bloc des statistiques (carré, 2x2) -->
                    <div class="stats-block">
                        <div class="stats-grid">
                            ${this.renderStatsCards()}
                        </div>
                    </div>

                    <!-- Bloc aperçu campagne (comme dans explorer) -->
                    <div class="campaign-preview-block">
                        ${this.renderCampaignPreview()}
                    </div>
                </div>

                <!-- Section créateurs -->
                <div class="analytics-creators-section">
                    ${this.renderCreatorsSection()}
                </div>
            </div>
        `;
    }

    // Ancienne méthode supprimée - utilise maintenant renderStatsCards()

    renderStatsCards() {
        const totalSpent = this.metrics.views * 2.50; // Calcul budget dépensé

        const statsData = [
            {
                title: 'Vues',
                value: this.formatNumber(this.metrics.views),
                icon: this.getEyeIcon(),
                color: 'blue'
            },
            {
                title: 'Engagement',
                value: this.formatNumber(this.metrics.likes),
                subtitle: `${this.formatNumber(this.metrics.comments)} commentaires`,
                icon: this.getHeartIcon(),
                color: 'pink'
            },
            {
                title: 'Videos',
                value: this.formatNumber(this.metrics.videos),
                subtitle: 'soumises',
                icon: this.getVideoIcon(),
                color: 'purple'
            },
            {
                title: 'Budget dépensé',
                value: `${totalSpent.toFixed(2)}€`,
                subtitle: `${this.formatNumber(this.metrics.views)} × 2.50€`,
                icon: this.getMoneyIcon(),
                color: 'green'
            }
        ];

        return statsData.map(stat => `
            <div class="stat-card stat-card-${stat.color}">
                <div class="stat-icon">
                    ${stat.icon}
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-title">${stat.title}</div>
                    ${stat.subtitle ? `<div class="stat-subtitle">${stat.subtitle}</div>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderCampaignPreview() {
        return `
            <div class="campaign-preview-card">
                <div class="campaign-card">
                    <div class="campaign-header">
                        <div class="campaign-title-section">
                            <h3 class="campaign-title">${this.campaignData?.title || 'Ma campagne'}</h3>
                            <div class="campaign-meta">
                                <span class="campaign-status status-active">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                                        <circle cx="4" cy="4" r="4"/>
                                    </svg>
                                    Actif
                                </span>
                                <span class="campaign-date">Créé le ${this.formatDate(this.campaignData?.created_at || new Date())}</span>
                            </div>
                        </div>
                    </div>

                    <div class="campaign-content">
                        <div class="campaign-description">
                            <p>Campagne de marketing d'influence pour promouvoir notre produit auprès d'une audience ciblée.</p>
                        </div>

                        <div class="campaign-metrics-preview">
                            <div class="metric-preview">
                                <span class="metric-label">CPM</span>
                                <span class="metric-value">${this.campaignData?.cpm || '2.50'}€</span>
                            </div>
                            <div class="metric-preview">
                                <span class="metric-label">Budget</span>
                                <span class="metric-value">${this.formatCurrency(this.campaignData?.budget || 500)}</span>
                            </div>
                            <div class="metric-preview">
                                <span class="metric-label">Créateurs</span>
                                <span class="metric-value">${this.creators.length}</span>
                            </div>
                        </div>

                        <div class="campaign-tags">
                            <span class="tag">Marketing</span>
                            <span class="tag">Influence</span>
                            <span class="tag">Digital</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCampaignInfo() {
        return `
            <div class="campaign-info-card">
                <div class="card-header">
                    <h3>Info sur la campagne</h3>
                </div>
                <div class="card-content">
                    <div class="campaign-details">
                        <div class="campaign-detail-item">
                            <span class="detail-label">Titre:</span>
                            <span class="detail-value">${this.campaignData?.title || 'Ma campagne'}</span>
                        </div>
                        <div class="campaign-detail-item">
                            <span class="detail-label">Statut:</span>
                            <span class="detail-value status-active">Actif</span>
                        </div>
                        <div class="campaign-detail-item">
                            <span class="detail-label">CPM:</span>
                            <span class="detail-value">${this.campaignData?.cpm || '2.50'}€</span>
                        </div>
                        <div class="campaign-detail-item">
                            <span class="detail-label">Budget total:</span>
                            <span class="detail-value">${this.formatCurrency(this.campaignData?.budget || 500)}</span>
                        </div>
                        <div class="campaign-detail-item">
                            <span class="detail-label">Cree le:</span>
                            <span class="detail-value">${this.formatDate(this.campaignData?.created_at || new Date())}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCreatorsSection() {
        const activeCreatorsCount = this.creators.length;

        return `
            <div class="creators-section">
                <!-- Lien d'invitation -->
                <div class="invite-section">
                    <div class="invite-header">
                        <h3>Lien d'invitation de campagne</h3>
                        <p>Partagez ce lien pour inviter des createurs a rejoindre votre campagne</p>
                    </div>
                    <div class="invite-link-container">
                        <input
                            type="text"
                            class="invite-link-input"
                            value="${this.inviteLink || 'https://dafnck.army/join/abc123'}"
                            readonly
                            placeholder="Lien d'invitation de campagne"
                        >
                        <button class="btn btn-primary invite-copy-btn" data-action="copy-invite-link">
                            Copier le lien
                        </button>
                    </div>
                </div>

                <!-- Liste des créateurs -->
                <div class="creators-list-section">
                    <div class="creators-header">
                        <h3>Createurs actifs</h3>
                        <span class="creators-count">${activeCreatorsCount} createur${activeCreatorsCount !== 1 ? 's' : ''} actif${activeCreatorsCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="creators-list">
                        ${this.renderCreatorsList()}
                    </div>
                </div>
            </div>
        `;
    }

    renderCreatorsList() {
        if (this.creators.length === 0) {
            return `
                <div class="creator-card creator-placeholder">
                    <div class="creator-info">
                        <span class="creator-name">creator 1</span>
                        <span class="creator-status">En attente</span>
                    </div>
                </div>
                <div class="creator-card creator-placeholder">
                    <div class="creator-info">
                        <span class="creator-name">creator 2</span>
                        <span class="creator-status">En attente</span>
                    </div>
                </div>
            `;
        }

        return this.creators.map((creator, index) => `
            <div class="creator-card">
                <div class="creator-avatar">
                    <img src="${creator.avatar || '/images/default-avatar.svg'}" alt="${creator.name}">
                </div>
                <div class="creator-info">
                    <span class="creator-name">${creator.name || `creator ${index + 1}`}</span>
                    <span class="creator-stats">${creator.videos || 0} videos • ${this.formatNumber(creator.views || 0)} vues</span>
                </div>
                <div class="creator-actions">
                    <button class="btn btn-sm btn-secondary" data-action="view-creator" data-creator-id="${creator.id}">
                        Voir
                    </button>
                </div>
            </div>
        `).join('');
    }



    // Méthodes utilitaires
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    formatCurrency(amount) {
        return `${amount}€`;
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('fr-FR');
    }

    // Icônes SVG
    getEyeIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;
    }

    getVideoIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
        `;
    }

    getHeartIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        `;
    }

    getMessageIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        `;
    }

    getMoneyIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        `;
    }

    async init() {
        // Initialize sidebar
        await this.sidebar.init();

        // Load campaign data
        await this.loadCampaignData();

        // Handle action buttons
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                // Vérifier si l'action appartient à cette page
                const analyticsContainer = e.target.closest('[data-component="StartupAnalyticsPage"]');
                if (analyticsContainer) {
                    e.preventDefault();
                    e.stopPropagation(); // Empêcher la propagation vers la sidebar
                    this.handleAction(action.dataset.action, action);
                }
            }
        });
    }

    async loadCampaignData() {
        try {
            // Simuler le chargement des données
            this.metrics = {
                views: 12500,
                videos: 8,
                likes: 850,
                comments: 400,
                engagementRate: 10.0
            };

            this.campaignData = {
                title: 'Campagne Marketing Q4',
                cpm: '2.50',
                budget: 500,
                created_at: new Date('2024-01-15')
            };

            this.inviteLink = 'https://dafnck.army/join/abc123xyz';
            
            // Simuler quelques créateurs
            this.creators = [
                {
                    id: 1,
                    name: 'creator 1',
                    videos: 3,
                    views: 5200,
                    avatar: null
                },
                {
                    id: 2,
                    name: 'creator 2',
                    videos: 5,
                    views: 7300,
                    avatar: null
                }
            ];

        } catch (error) {
            console.error('Error loading campaign data:', error);
        }
    }

    handleAction(action, element) {
        switch (action) {
            case 'refresh-data':
                this.loadCampaignData();
                this.showNotification('Données actualisées', 'success');
                break;
            case 'copy-invite-link':
                this.copyInviteLink();
                break;
            case 'view-creator':
                const creatorId = element.dataset.creatorId;
                this.viewCreator(creatorId);
                break;

            default:
                console.log('Action not implemented:', action);
        }
    }

    copyInviteLink() {
        const input = document.querySelector('.invite-link-input');
        if (input) {
            input.select();
            document.execCommand('copy');
            this.showNotification('Lien copié dans le presse-papiers', 'success');
        }
    }

    viewCreator(creatorId) {
        console.log('Viewing creator:', creatorId);
        // Implémenter la vue détaillée du créateur
    }


}

console.log('🔧 Startup Analytics Page loaded');
