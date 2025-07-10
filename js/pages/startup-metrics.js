// Page Métriques pour Startup - Dafnck Army
class StartupMetricsPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Métriques - Dafnck Army';
    }
    
    async render() {
        const userCampaigns = this.getUserCampaignsCount();
        
        return `
            <div class="min-h-screen bg-gray-50 flex" data-component="StartupMetricsPage">
                <!-- Sidemenu Navigation -->
                ${this.renderSidemenu()}
                
                <!-- Main Content Area -->
                <div class="flex-1 flex flex-col">
                    <!-- Top Header -->
                    ${this.renderTopHeader()}
                    
                    <!-- Page Content -->
                    <main class="flex-1 p-6">
                        ${userCampaigns === 0 ? this.renderEmptyState() : this.renderMetricsContent()}
                    </main>
                </div>
            </div>
        `;
    }
    
    renderSidemenu() {
        return `
            <div class="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
                <!-- Logo/Brand -->
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg">D</span>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-gray-900">Dafnck Army</h1>
                            <p class="text-xs text-gray-500">Startup</p>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation Menu -->
                <nav class="flex-1 p-4">
                    <ul class="space-y-2">
                        ${this.renderMenuItems()}
                    </ul>
                </nav>
                
                <!-- Create Campaign CTA -->
                <div class="p-4 border-t border-gray-200">
                    <button class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2" data-action="create-campaign">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        <span>Créer Campagne</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    renderMenuItems() {
        const currentPath = window.location.pathname;
        const userCampaigns = this.getUserCampaignsCount();
        
        const menuItems = [
            { path: '/explorer', label: 'Explorer', icon: '🔍' },
            { path: '/metrics', label: 'Métriques', icon: '📊', disabled: userCampaigns === 0 },
            { path: '/submissions', label: 'Submissions', icon: '🎥', disabled: userCampaigns === 0 },
            { path: '/budget', label: 'Budget', icon: '💰' },
            { path: '/profile', label: 'Profil', icon: '👤' }
        ];
        
        return menuItems.map(item => {
            const isActive = currentPath === item.path;
            const isDisabled = item.disabled;
            
            return `
                <li>
                    <a href="${item.path}" class="w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                        isActive 
                            ? 'bg-red-100 text-red-700 font-medium' 
                            : isDisabled 
                                ? 'text-gray-400 cursor-not-allowed pointer-events-none'
                                : 'text-gray-700 hover:bg-gray-100'
                    }">
                        <span class="text-lg">${item.icon}</span>
                        <span class="flex-1">${item.label}</span>
                    </a>
                </li>
            `;
        }).join('');
    }
    
    renderTopHeader() {
        return `
            <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Métriques & Analytics</h1>
                        <p class="text-sm text-gray-600 mt-1">Analysez les performances de vos campagnes</p>
                    </div>
                </div>
            </header>
        `;
    }
    
    renderEmptyState() {
        return `
            <div class="max-w-4xl mx-auto text-center py-12">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                </div>
                <h2 class="text-xl font-semibold text-gray-900 mb-2">Aucune métrique disponible</h2>
                <p class="text-gray-600 mb-6">Créez votre première campagne pour voir vos analytics</p>
                <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors" data-action="create-campaign">
                    Créer une campagne
                </button>
            </div>
        `;
    }
    
    renderMetricsContent() {
        return `
            <div class="max-w-6xl mx-auto">
                <!-- Stats Overview -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-semibold text-gray-900">3</p>
                                <p class="text-sm text-gray-600">Campagnes actives</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-semibold text-gray-900">1,250€</p>
                                <p class="text-sm text-gray-600">Budget restant</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-semibold text-gray-900">15</p>
                                <p class="text-sm text-gray-600">Vidéos reçues</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-2xl font-semibold text-gray-900">89%</p>
                                <p class="text-sm text-gray-600">Taux de succès</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance par campagne</h3>
                        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                            <p class="text-gray-500">📊 Graphique des performances</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">ROI et conversion</h3>
                        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                            <p class="text-gray-500">💹 Graphique ROI</p>
                        </div>
                    </div>
                </div>
                
                <!-- Campaign Details -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Détails par campagne</h3>
                    </div>
                    <div class="p-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campagne</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vues</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">Ma Première Campagne</div>
                                            <div class="text-sm text-gray-500">Lancée il y a 5 jours</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12,543</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8.2%</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">+245%</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getUserCampaignsCount() {
        // Récupérer les campagnes sauvegardées localement
        const campaigns = JSON.parse(localStorage.getItem('user_campaigns') || '[]');
        return campaigns.length;
    }
    
    async init() {
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                this.handleAction(action.dataset.action);
            }
        });
    }
    
    handleAction(action) {
        switch (action) {
            case 'create-campaign':
                this.router.navigate('/campaign/create');
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }
}

console.log('🔧 Startup Metrics Page loaded');
