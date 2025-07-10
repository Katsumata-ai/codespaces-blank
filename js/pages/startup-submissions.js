// Page Submissions pour Startup - Dafnck Army
class StartupSubmissionsPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Submissions - Dafnck Army';
    }
    
    async render() {
        const userCampaigns = this.getUserCampaignsCount();
        
        return `
            <div class="min-h-screen bg-gray-50 flex" data-component="StartupSubmissionsPage">
                <!-- Sidemenu Navigation -->
                ${this.renderSidemenu()}
                
                <!-- Main Content Area -->
                <div class="flex-1 flex flex-col">
                    <!-- Top Header -->
                    ${this.renderTopHeader()}
                    
                    <!-- Page Content -->
                    <main class="flex-1 p-6">
                        ${userCampaigns === 0 ? this.renderEmptyState() : this.renderSubmissionsContent()}
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
                        <h1 class="text-2xl font-bold text-gray-900">Vidéos Reçues</h1>
                        <p class="text-sm text-gray-600 mt-1">Validez les vidéos soumises par les créateurs</p>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <div class="flex space-x-2">
                            <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <option>Toutes</option>
                                <option>En attente</option>
                                <option>Approuvées</option>
                                <option>Rejetées</option>
                            </select>
                        </div>
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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h2 class="text-xl font-semibold text-gray-900 mb-2">Aucune soumission</h2>
                <p class="text-gray-600 mb-6">Les créateurs pourront soumettre leurs vidéos une fois que vous aurez créé une campagne</p>
                <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors" data-action="create-campaign">
                    Créer une campagne
                </button>
            </div>
        `;
    }
    
    renderSubmissionsContent() {
        return `
            <div class="max-w-6xl mx-auto">
                <!-- Submissions Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-semibold text-orange-600">5</p>
                                <p class="text-sm text-gray-600">En attente</p>
                            </div>
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-semibold text-green-600">12</p>
                                <p class="text-sm text-gray-600">Approuvées</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-2xl font-semibold text-red-600">3</p>
                                <p class="text-sm text-gray-600">Rejetées</p>
                            </div>
                            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Submissions List -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Vidéos soumises</h3>
                    </div>
                    <div class="p-6">
                        ${this.renderSubmissionsList()}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderSubmissionsList() {
        const mockSubmissions = [
            {
                id: 1,
                creator: "@creator_tech",
                campaign: "Lancement Produit X",
                title: "Unboxing détaillé",
                duration: "2:30",
                status: "pending",
                thumbnail: "🎬"
            },
            {
                id: 2,
                creator: "@lifestyle_guru",
                campaign: "Collection Été",
                title: "Review complète",
                duration: "3:15",
                status: "pending",
                thumbnail: "🎥"
            }
        ];
        
        return mockSubmissions.map(submission => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow mb-4">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        ${submission.thumbnail}
                    </div>
                    
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <h4 class="font-semibold text-gray-900">${submission.creator}</h4>
                            <span class="text-sm text-gray-500">•</span>
                            <span class="text-sm text-gray-500">${submission.campaign}</span>
                        </div>
                        <h5 class="text-gray-800 mb-1">${submission.title}</h5>
                        <p class="text-sm text-gray-500">Durée: ${submission.duration}</p>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm" data-action="view-video" data-id="${submission.id}">
                            ▶️ Voir
                        </button>
                        <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm" data-action="approve-video" data-id="${submission.id}">
                            ✅ Approuver
                        </button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm" data-action="reject-video" data-id="${submission.id}">
                            ❌ Rejeter
                        </button>
                        <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm" data-action="comment-video" data-id="${submission.id}">
                            💬 Commenter
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
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
                this.handleAction(action.dataset.action, action);
            }
        });
    }
    
    handleAction(action, element) {
        const id = element?.dataset?.id;
        
        switch (action) {
            case 'create-campaign':
                this.router.navigate('/campaign/create');
                break;
            case 'view-video':
                this.showNotification(`Lecture vidéo ${id} - À venir !`, 'info');
                break;
            case 'approve-video':
                this.showNotification(`Vidéo ${id} approuvée !`, 'success');
                break;
            case 'reject-video':
                this.showNotification(`Vidéo ${id} rejetée`, 'warning');
                break;
            case 'comment-video':
                this.showNotification(`Commentaire vidéo ${id} - À venir !`, 'info');
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }
}

console.log('🔧 Startup Submissions Page loaded');
