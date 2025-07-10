// Page Explorer pour Dafnck Army
class ExplorerPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Explorer les campagnes - Dafnck Army';
        this.campaigns = [];
        this.filteredCampaigns = [];
        this.filters = {
            search: '',
            cpmMin: null,
            cpmMax: null,
            category: null,
            status: 'active'
        };
        this.loading = false;
    }
    
    async render() {
        return `
            <div class="explorer-page" data-component="ExplorerPage">
                <div class="explorer-container">
                    <div class="explorer-header">
                        <div class="header-content">
                            <h1>Explorer les campagnes</h1>
                            <p>Découvrez les missions disponibles et commencez à gagner de l'argent avec votre contenu</p>
                        </div>
                        
                        <div class="header-stats">
                            <div class="stat-card">
                                <div class="stat-value" data-stat="total-campaigns">-</div>
                                <div class="stat-label">Campagnes actives</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" data-stat="avg-cpm">-</div>
                                <div class="stat-label">CPM moyen</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" data-stat="total-budget">-</div>
                                <div class="stat-label">Budget total</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="explorer-filters">
                        <div class="filters-row">
                            <div class="search-box">
                                <input type="text" class="search-input" placeholder="Rechercher une campagne..." 
                                       data-filter="search" value="${this.filters.search}">
                                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                            </div>
                            
                            <div class="filter-group">
                                <select class="filter-select" data-filter="status">
                                    <option value="active">Campagnes actives</option>
                                    <option value="all">Toutes les campagnes</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <input type="number" class="filter-input" placeholder="CPM min" 
                                       data-filter="cpmMin" min="1" step="0.1">
                                <span class="filter-separator">-</span>
                                <input type="number" class="filter-input" placeholder="CPM max" 
                                       data-filter="cpmMax" min="1" step="0.1">
                            </div>
                            
                            <button class="btn btn-ghost filter-reset" data-action="reset-filters">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                                Réinitialiser
                            </button>
                        </div>
                        
                        <div class="filters-summary">
                            <span class="results-count">
                                <span data-results-count>0</span> campagne(s) trouvée(s)
                            </span>
                            
                            <div class="view-options">
                                <button class="view-btn active" data-view="grid">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
                                    </svg>
                                </button>
                                <button class="view-btn" data-view="list">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="explorer-content">
                        <div class="campaigns-grid" data-campaigns-container>
                            <!-- Les campagnes seront chargées ici -->
                        </div>
                        
                        <div class="empty-state" data-empty-state style="display: none;">
                            <div class="empty-icon">🔍</div>
                            <h3>Aucune campagne trouvée</h3>
                            <p>Essayez de modifier vos filtres ou revenez plus tard pour découvrir de nouvelles missions.</p>
                            <button class="btn btn-primary" data-action="reset-filters">
                                Réinitialiser les filtres
                            </button>
                        </div>
                        
                        <div class="loading-state" data-loading-state style="display: none;">
                            <div class="loading-spinner"></div>
                            <p>Chargement des campagnes...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async init() {
        // Event listeners pour les filtres
        this.addEventListener(document, 'input', this.debounce((e) => {
            const filter = e.target.dataset.filter;
            if (filter) {
                this.updateFilter(filter, e.target.value);
            }
        }, 300));
        
        this.addEventListener(document, 'change', (e) => {
            const filter = e.target.dataset.filter;
            if (filter) {
                this.updateFilter(filter, e.target.value);
            }
        });
        
        // Event listeners pour les actions
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                this.handleAction(action.dataset.action);
            }
            
            const viewBtn = e.target.closest('[data-view]');
            if (viewBtn) {
                this.switchView(viewBtn.dataset.view);
            }
        });
        
        // Charger les campagnes
        await this.loadCampaigns();
        
        // Actualisation périodique
        this.startPeriodicRefresh();
    }
    
    async loadCampaigns() {
        try {
            this.setLoading(true);
            
            const result = await window.apiManager.getCampaigns({
                status: this.filters.status === 'all' ? undefined : this.filters.status
            });
            
            if (result.success) {
                this.campaigns = result.data || [];
                this.applyFilters();
                this.updateStats();
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Error loading campaigns:', error);
            this.showNotification('Erreur lors du chargement des campagnes', 'error');
            this.campaigns = [];
            this.filteredCampaigns = [];
        } finally {
            this.setLoading(false);
        }
    }
    
    updateFilter(filterName, value) {
        this.filters[filterName] = value || null;
        this.applyFilters();
    }
    
    applyFilters() {
        let filtered = [...this.campaigns];
        
        // Filtre de recherche
        if (this.filters.search) {
            const search = this.filters.search.toLowerCase();
            filtered = filtered.filter(campaign => 
                campaign.title.toLowerCase().includes(search) ||
                campaign.description?.toLowerCase().includes(search) ||
                campaign.company?.email.toLowerCase().includes(search)
            );
        }
        
        // Filtre CPM minimum
        if (this.filters.cpmMin) {
            filtered = filtered.filter(campaign => 
                campaign.cpm_rate >= parseFloat(this.filters.cpmMin)
            );
        }
        
        // Filtre CPM maximum
        if (this.filters.cpmMax) {
            filtered = filtered.filter(campaign => 
                campaign.cmp_rate <= parseFloat(this.filters.cpmMax)
            );
        }
        
        this.filteredCampaigns = filtered;
        this.renderCampaigns();
        this.updateResultsCount();
    }
    
    renderCampaigns() {
        const container = document.querySelector('[data-campaigns-container]');
        const emptyState = document.querySelector('[data-empty-state]');
        
        if (this.filteredCampaigns.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        emptyState.style.display = 'none';
        
        // Rendre les cartes de campagne
        container.innerHTML = this.filteredCampaigns.map(campaign => {
            const card = new CampaignCard(campaign, 'creator');
            return card.render();
        }).join('');
        
        // Initialiser les cartes
        this.filteredCampaigns.forEach(campaign => {
            const cardElement = container.querySelector(`[data-campaign-id="${campaign.id}"]`);
            if (cardElement) {
                const card = new CampaignCard(campaign, 'creator');
                card.element = cardElement;
                card.init();
            }
        });
    }
    
    updateStats() {
        const totalCampaigns = this.campaigns.filter(c => c.status === 'active').length;
        const avgCpm = this.campaigns.length > 0 
            ? this.campaigns.reduce((sum, c) => sum + c.cpm_rate, 0) / this.campaigns.length 
            : 0;
        const totalBudget = this.campaigns.reduce((sum, c) => sum + c.budget_remaining, 0);
        
        const totalElement = document.querySelector('[data-stat="total-campaigns"]');
        const avgElement = document.querySelector('[data-stat="avg-cpm"]');
        const budgetElement = document.querySelector('[data-stat="total-budget"]');
        
        if (totalElement) totalElement.textContent = totalCampaigns;
        if (avgElement) avgElement.textContent = Formatters.currency(avgCpm);
        if (budgetElement) budgetElement.textContent = Formatters.currency(totalBudget);
    }
    
    updateResultsCount() {
        const countElement = document.querySelector('[data-results-count]');
        if (countElement) {
            countElement.textContent = this.filteredCampaigns.length;
        }
    }
    
    setLoading(loading) {
        this.loading = loading;
        const loadingState = document.querySelector('[data-loading-state]');
        const content = document.querySelector('[data-campaigns-container]');
        
        if (loadingState && content) {
            loadingState.style.display = loading ? 'block' : 'none';
            content.style.display = loading ? 'none' : 'grid';
        }
    }
    
    handleAction(action) {
        switch (action) {
            case 'reset-filters':
                this.resetFilters();
                break;
            case 'refresh':
                this.loadCampaigns();
                break;
        }
    }
    
    resetFilters() {
        this.filters = {
            search: '',
            cpmMin: null,
            cpmMax: null,
            category: null,
            status: 'active'
        };
        
        // Réinitialiser les champs de filtre
        document.querySelector('[data-filter="search"]').value = '';
        document.querySelector('[data-filter="status"]').value = 'active';
        document.querySelector('[data-filter="cpmMin"]').value = '';
        document.querySelector('[data-filter="cpmMax"]').value = '';
        
        this.applyFilters();
    }
    
    switchView(view) {
        const viewBtns = document.querySelectorAll('[data-view]');
        const container = document.querySelector('[data-campaigns-container]');
        
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        if (container) {
            container.className = view === 'list' ? 'campaigns-list' : 'campaigns-grid';
        }
    }
    
    startPeriodicRefresh() {
        // Actualiser les campagnes toutes les 5 minutes
        setInterval(() => {
            if (!this.loading) {
                this.loadCampaigns();
            }
        }, 5 * 60 * 1000);
    }
    
    onDestroy() {
        // Nettoyer les intervalles
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }
}

console.log('🔧 Explorer Page loaded');
