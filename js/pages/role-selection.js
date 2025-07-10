// Page de sélection de rôle pour Dafnck Army
class RoleSelectionPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Choose your role - Dafnck Army';
    }
    
    async render() {
        return `
            <style>
                .logo-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    transition: all 0.2s ease;
                }

                .logo-button:hover {
                    transform: translateY(-1px);
                }

                .logo-brand {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #1E3A8A;
                    letter-spacing: 0.05em;
                }
            </style>
            <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-component="RoleSelectionPage">
                <div class="max-w-4xl mx-auto">
                    <!-- Logo cliquable centré -->
                    <div class="text-center mb-8">
                        <button class="logo-button mb-6" data-action="home">
                            <span class="logo-brand">DAFNCK ARMY</span>
                        </button>
                        <h1 class="text-3xl font-bold text-gray-900 mb-3">Choose your role</h1>
                        <p class="text-lg text-gray-600 max-w-xl mx-auto">Your role is permanent for this account. Choose wisely.</p>
                    </div>

                    <!-- Role Selection Cards -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <!-- Business Card -->
                        <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-800 cursor-pointer" data-role="startup">
                            <div class="p-6">
                                <!-- Icon -->
                                <div class="w-16 h-16 bg-blue-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-900 transition-colors">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                </div>

                                <!-- Content -->
                                <h3 class="text-2xl font-bold text-blue-800 mb-3">🎯 Business</h3>
                                <p class="text-gray-600 mb-4 leading-relaxed">Launch viral campaigns and mobilize creators to promote your brand with guaranteed ROI.</p>

                                <!-- Features -->
                                <ul class="space-y-2 mb-6">
                                    <li class="flex items-center text-sm text-gray-700">
                                        <div class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-800">
                                                <polyline points="20,6 9,17 4,12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        Unlimited campaigns
                                    </li>
                                    <li class="flex items-center text-sm text-gray-700">
                                        <div class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-800">
                                                <polyline points="20,6 9,17 4,12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        Performance-based payment
                                    </li>
                                    <li class="flex items-center text-sm text-gray-700">
                                        <div class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-800">
                                                <polyline points="20,6 9,17 4,12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        Real-time analytics
                                    </li>
                                </ul>

                                <!-- Button -->
                                <button class="w-full bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors duration-200 group-hover:bg-blue-900">
                                    Choose Business
                                </button>
                            </div>
                        </div>

                        <!-- Creator Card -->
                        <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-400 cursor-pointer" data-role="creator">
                            <div class="p-6">
                                <!-- Icon -->
                                <div class="w-16 h-16 bg-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                </div>

                                <!-- Content -->
                                <h3 class="text-2xl font-bold text-blue-400 mb-3">⚡ Creator</h3>
                                <p class="text-gray-600 mb-4 leading-relaxed">Monetize your content by participating in performance-based paid missions with guaranteed payment.</p>

                                <!-- Features -->
                                <ul class="space-y-2 mb-6">
                                    <li class="flex items-center text-sm text-gray-700">
                                        <div class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-400">
                                                <polyline points="20,6 9,17 4,12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        Paid missions
                                    </li>
                                    <li class="flex items-center text-sm text-gray-700">
                                        <div class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-400">
                                                <polyline points="20,6 9,17 4,12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        Instant payment
                                    </li>
                                    <li class="flex items-center text-sm text-gray-700">
                                        <div class="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-400">
                                                <polyline points="20,6 9,17 4,12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        Creative freedom
                                    </li>
                                </ul>

                                <!-- Button -->
                                <button class="w-full bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-200 group-hover:bg-blue-500">
                                    Choose Creator
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        `;
    }
    
    async init() {
        this.addEventListener(document, 'click', (e) => {
            const actionButton = e.target.closest('[data-action]');
            if (actionButton) {
                e.preventDefault();
                const action = actionButton.dataset.action;
                if (action === 'home') {
                    this.router.navigate('/');
                }
                return;
            }

            const roleCard = e.target.closest('[data-role]');
            if (roleCard) {
                const role = roleCard.dataset.role;
                this.selectRole(role);
            }
        });
    }
    
    async selectRole(role) {
        try {
            // Stocker le rôle sélectionné
            sessionStorage.setItem('selectedRole', role);

            // Redirection vers l'authentification avec le rôle
            this.router.navigate(`/auth?mode=signup&role=${role}`);

        } catch (error) {
            console.error('Role selection error:', error);
            this.showNotification('Error during configuration', 'error');
        }
    }
}

window.RoleSelectionPage = RoleSelectionPage;
