// Pages d'onboarding pour Dafnck Army

class OnboardingProfilePage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Configuration du profil - Dafnck Army';
        this.industries = [];
        this.platforms = [];

        // Charger les données sauvegardées automatiquement
        this.loadDraftData();
    }
    
    async render() {
        const userRole = this.userRole;
        const isStartup = userRole === 'startup';

        return `
            <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-component="OnboardingProfilePage">
                <div class="max-w-3xl mx-auto">
                    <!-- Header -->
                    <div class="text-center mb-8">
                        <div class="mb-6">
                            <div class="inline-flex items-center justify-center w-16 h-16 ${isStartup ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-blue-400 to-blue-600'} rounded-2xl mb-4">
                                <span class="text-white text-2xl">👋</span>
                            </div>
                            <h1 class="text-2xl font-bold text-gray-900 mb-2">
                                ${isStartup ? 'Welcome to Dafnck Army!' : 'Bienvenue dans Dafnck Army !'}
                            </h1>
                            <p class="text-gray-600 text-lg">
                                ${isStartup ?
                                    'Let\'s set up your startup profile to start creating powerful campaigns' :
                                    'Configurons votre profil pour une expérience optimale'
                                }
                            </p>
                        </div>

                        ${!isStartup ? `
                        <!-- Bouton retour -->
                        <div class="flex justify-center mb-4">
                            <button class="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" data-action="back-to-role">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                                Changer de rôle
                            </button>
                        </div>
                        ` : ''}
                    </div>

                    <!-- Main Content -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        ${this.renderProfileForm()}
                    </div>

                    <!-- Footer -->
                    <div class="text-center mt-6">
                        <p class="text-sm text-gray-500">💡 Your information can be updated later in settings</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderProfileForm() {
        const userRole = this.userRole;
        const isStartup = userRole === 'startup';

        return `
            <div class="p-6">
                <!-- Informations personnelles -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                        Personal Information
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder-gray-500"
                                   placeholder="Enter your first name"
                                   style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                        </div>
                        <div>
                            <label for="lastName" class="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder-gray-500"
                                   placeholder="Enter your last name"
                                   style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                        </div>
                        <div class="md:col-span-2">
                            <label for="country" class="block text-sm font-semibold text-gray-800 mb-2">Country *</label>
                            <input type="text" id="country" name="country" required
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder-gray-500"
                                   placeholder="Enter your country"
                                   style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                        </div>
                    </div>
                </div>

                <!-- Informations professionnelles -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                        ${isStartup ? 'Business Information' : 'Creator Information'}
                    </h3>
                    ${isStartup ? this.renderStartupFields() : this.renderCreatorFields()}
                </div>

                ${!isStartup ? `
                <!-- Configuration des paiements (optionnelle) -->
                <div class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-900 mb-6">Configuration des paiements</h3>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h4 class="text-sm font-medium text-blue-800">Configuration optionnelle</h4>
                                <p class="text-sm text-blue-700 mt-1">
                                    Vous pourrez lier votre compte bancaire plus tard pour recevoir vos gains.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                    <button type="button"
                            class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center"
                            data-action="save-profile">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Save and Continue
                    </button>
                    ${!isStartup ? `
                    <button type="button"
                            class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            data-action="skip">
                        Skip for now
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderStartupFields() {
        return `
            <div class="space-y-4">
                <!-- Company Name -->
                <div>
                    <label for="companyName" class="block text-sm font-semibold text-gray-800 mb-2">Company Name *</label>
                    <input type="text" id="companyName" name="companyName" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder-gray-500"
                           placeholder="Enter your company name"
                           style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                </div>

                <!-- Industries -->
                <div>
                    <label for="industries" class="block text-sm font-semibold text-gray-800 mb-2">Industries * (select at least 1)</label>
                    <div class="space-y-3">
                        <div class="flex gap-2">
                            <input type="text" id="industryInput"
                                   class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder-gray-500"
                                   placeholder="Type an industry and press Add"
                                   style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                            <button type="button" id="addIndustryBtn"
                                    class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Add
                            </button>
                        </div>
                        <div id="industriesList" class="flex flex-wrap gap-2 min-h-[2rem]">
                            <!-- Industries will be added here dynamically -->
                        </div>
                        <input type="hidden" id="industries" name="industries">
                    </div>
                </div>

                <!-- Product Link -->
                <div>
                    <label for="productLink" class="block text-sm font-semibold text-gray-800 mb-2">Product/Website Link *</label>
                    <input type="url" id="productLink" name="productLink" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder-gray-500"
                           placeholder="https://your-product.com"
                           style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                    <p class="text-sm text-gray-600 mt-2 flex items-center">
                        <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                        </svg>
                        Link to your main product, SaaS, or website
                    </p>
                </div>
            </div>
        `;
    }

    renderCreatorFields() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="creatorName" class="block text-sm font-medium text-gray-700 mb-2">Nom de créateur</label>
                    <input type="text" id="creatorName" name="creatorName"
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                           placeholder="Votre nom de créateur">
                </div>
                <div>
                    <label for="niche" class="block text-sm font-medium text-gray-700 mb-2">Niche principale</label>
                    <select id="niche" name="niche"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                        <option value="">Sélectionnez votre niche</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="tech">Tech</option>
                        <option value="gaming">Gaming</option>
                        <option value="beauty">Beauté</option>
                        <option value="fitness">Fitness</option>
                        <option value="food">Food</option>
                        <option value="travel">Voyage</option>
                        <option value="other">Autre</option>
                    </select>
                </div>
                <div>
                    <label for="platforms" class="block text-sm font-medium text-gray-700 mb-2">Plateformes principales</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" name="platforms" value="youtube" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                            <span class="ml-2 text-sm text-gray-700">YouTube</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" name="platforms" value="tiktok" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                            <span class="ml-2 text-sm text-gray-700">TikTok</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" name="platforms" value="instagram" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                            <span class="ml-2 text-sm text-gray-700">Instagram</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label for="followers" class="block text-sm font-medium text-gray-700 mb-2">Nombre d'abonnés (total)</label>
                    <select id="followers" name="followers"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                        <option value="">Sélectionnez une tranche</option>
                        <option value="1k-10k">1K - 10K</option>
                        <option value="10k-50k">10K - 50K</option>
                        <option value="50k-100k">50K - 100K</option>
                        <option value="100k-500k">100K - 500K</option>
                        <option value="500k+">500K+</option>
                    </select>
                </div>
            </div>
        `;
    }

    renderStartupOnboarding() {
        return `
            <div class="stripe-startup">
                <div class="budget-info">
                    <div class="info-card">
                        <h3>💰 Budget sécurisé</h3>
                        <p>Votre budget est stocké en sécurité et ne sera débité qu'en cas de résultats réels.</p>
                    </div>
                    
                    <div class="info-card">
                        <h3>📊 Contrôle total</h3>
                        <p>Suivez en temps réel l'utilisation de votre budget et les performances de vos campagnes.</p>
                    </div>
                    
                    <div class="info-card">
                        <h3>🔒 Paiement sécurisé</h3>
                        <p>Transactions sécurisées par Stripe, leader mondial des paiements en ligne.</p>
                    </div>
                </div>
                
                <div class="budget-form">
                    <form data-budget-form>
                        <div class="form-group">
                            <label class="form-label">Budget initial</label>
                            <div class="input-group">
                                <input type="number" name="amount" class="form-input" 
                                       placeholder="100" min="50" step="10" required>
                                <span class="input-suffix">€</span>
                            </div>
                            <small class="form-help">Minimum 50€ - Vous pourrez recharger à tout moment</small>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-large">
                            Déposer mon budget
                        </button>
                    </form>
                </div>
            </div>
        `;
    }
    
    renderCreatorOnboarding() {
        return `
            <div class="stripe-creator">
                <div class="payment-info">
                    <div class="info-card">
                        <h3>⚡ Paiements instantanés</h3>
                        <p>Recevez vos gains automatiquement dès que vos vidéos atteignent les objectifs.</p>
                    </div>
                    
                    <div class="info-card">
                        <h3>🏦 Compte bancaire sécurisé</h3>
                        <p>Vos informations bancaires sont protégées par Stripe et ne sont jamais stockées sur nos serveurs.</p>
                    </div>
                    
                    <div class="info-card">
                        <h3>📈 Suivi des revenus</h3>
                        <p>Consultez vos gains en temps réel et téléchargez vos justificatifs de paiement.</p>
                    </div>
                </div>
                
                <div class="connect-form">
                    <button class="btn btn-primary btn-large" data-action="connect-stripe">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Configurer mon compte bancaire
                    </button>
                    
                    <p class="connect-help">
                        Vous serez redirigé vers Stripe pour configurer votre compte de manière sécurisée.
                    </p>
                </div>
            </div>
        `;
    }
    
    async init() {
        // Initialize industries array for startup users
        this.industries = this.industries || [];

        // Event listener pour sauvegarder le profil
        this.addEventListener('[data-action="save-profile"]', 'click', (e) => {
            e.preventDefault();
            this.handleSaveProfile();
        });

        // Event listener pour skip
        this.addEventListener('[data-action="skip"]', 'click', (e) => {
            e.preventDefault();
            this.handleSkip();
        });

        // Event listener pour retour vers sélection de rôle
        this.addEventListener('[data-action="back-to-role"]', 'click', (e) => {
            e.preventDefault();
            this.handleBackToRole();
        });

        // Sauvegarde automatique lors de la saisie
        this.setupAutoSave();

        // Initialize industries management after DOM is ready
        setTimeout(() => {
            this.initIndustriesManagement();
            this.loadExistingProfile();
            // Restaurer les données de brouillon après le chargement du profil
            setTimeout(() => {
                this.populateFormFromDraft();
            }, 200);
        }, 100);
    }

    setupAutoSave() {
        // Sauvegarde automatique toutes les 2 secondes lors de la saisie
        let saveTimeout;

        const autoSave = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.saveDraftData();
            }, 2000);
        };

        // Écouter tous les changements de formulaire
        this.addEventListener(document, 'input', (e) => {
            if (e.target.closest('[data-component="OnboardingProfilePage"]')) {
                autoSave();
            }
        });

        this.addEventListener(document, 'change', (e) => {
            if (e.target.closest('[data-component="OnboardingProfilePage"]')) {
                autoSave();
            }
        });

        // Sauvegarder avant de quitter la page
        window.addEventListener('beforeunload', () => {
            this.saveDraftData();
        });
    }

    async loadExistingProfile() {
        try {
            const user = await window.supabaseClient.auth.getUser();
            if (!user?.data?.user) return;

            // Determine which table to check based on user role
            const userRole = window.appState.getState('userRole');
            if (!userRole) {
                console.log('🔧 No user role found, skipping profile load');
                return;
            }

            const tableName = userRole === 'startup' ? 'startup_profiles' : 'creator_profiles';
            console.log('🔧 Loading profile from:', tableName);

            const { data: profile, error } = await window.supabaseClient
                .from(tableName)
                .select('*')
                .eq('id', user.data.user.id)
                .maybeSingle();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                console.error('Error loading profile:', error);
                return;
            }

            if (profile) {
                console.log('✅ Profile loaded:', profile);
                this.populateFormWithProfile(profile);
            } else {
                console.log('🔧 No existing profile found');
            }
        } catch (error) {
            console.error('Error loading existing profile:', error);
        }
    }

    populateFormWithProfile(profile) {
        // Populate form fields with existing data
        const fields = {
            'firstName': profile.first_name,
            'lastName': profile.last_name,
            'country': profile.country,
            'companyName': profile.company_name,
            'productLink': profile.product_link,
            'creatorName': profile.creator_name,
            'niche': profile.niche,
            'description': profile.description
        };

        Object.entries(fields).forEach(([fieldName, value]) => {
            const element = document.getElementById(fieldName);
            if (element && value) {
                element.value = value;
            }
        });

        // Handle industries array
        if (profile.industries && Array.isArray(profile.industries)) {
            this.industries = [...profile.industries];
            this.updateIndustriesDisplay();
        }
    }

    initIndustriesManagement() {
        // Event listeners for startup industries management
        const addIndustryBtn = document.getElementById('addIndustryBtn');
        const industryInput = document.getElementById('industryInput');

        console.log('🔧 Industries management init:', {
            addIndustryBtn: !!addIndustryBtn,
            industryInput: !!industryInput,
            userRole: this.userRole
        });

        if (addIndustryBtn && industryInput) {
            addIndustryBtn.addEventListener('click', () => {
                console.log('🔧 Add industry button clicked');
                this.addIndustry();
            });

            industryInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('🔧 Enter pressed in industry input');
                    this.addIndustry();
                }
            });
            console.log('✅ Industries event listeners attached');
        } else {
            console.warn('❌ Industries elements not found');
        }
    }

    addIndustry() {
        console.log('🔧 addIndustry called, current industries:', this.industries);

        const input = document.getElementById('industryInput');
        const industry = input.value.trim();

        console.log('🔧 Industry input value:', industry);

        if (!industry) {
            console.log('❌ Empty industry input');
            return;
        }

        if (this.industries.length >= 3) {
            console.log('❌ Max industries reached');
            this.showNotification('Maximum 3 industries allowed', 'error');
            return;
        }

        if (this.industries.includes(industry)) {
            console.log('❌ Industry already exists');
            this.showNotification('Industry already added', 'error');
            return;
        }

        this.industries.push(industry);
        console.log('✅ Industry added, new array:', this.industries);
        input.value = '';
        this.updateIndustriesDisplay();
    }

    removeIndustry(industry) {
        this.industries = this.industries.filter(i => i !== industry);
        this.updateIndustriesDisplay();
    }

    updateIndustriesDisplay() {
        const container = document.getElementById('industriesList');
        const hiddenInput = document.getElementById('industries');

        if (!container || !hiddenInput) return;

        container.innerHTML = this.industries.map(industry => `
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                ${industry}
                <button type="button" class="ml-2 text-blue-600 hover:text-blue-800" onclick="window.onboardingPage.removeIndustry('${industry}')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </span>
        `).join('');

        hiddenInput.value = JSON.stringify(this.industries);

        // Store reference for global access
        window.onboardingPage = this;
    }
    
    async handleSaveProfile() {
        try {
            console.log('🔧 Save profile started');
            console.log('🔧 Industries array:', this.industries);

            const formData = this.collectFormData();
            console.log('🔧 Collected form data:', formData);

            if (!this.validateProfileData(formData)) {
                console.log('❌ Validation failed');
                return;
            }

            const saveBtn = document.querySelector('[data-action="save-profile"]');
            if (saveBtn) {
                saveBtn.disabled = true;
                saveBtn.textContent = 'Enregistrement...';
            }

            // Sauvegarder le profil via l'API
            const result = await window.apiManager.updateUserProfile(formData);

            if (result.success) {
                this.showNotification('Profil enregistré avec succès !', 'success');

                // Supprimer les données de brouillon après sauvegarde réussie
                this.clearDraftData();

                // Marquer l'onboarding comme terminé
                await window.appState.setOnboardingCompleted(true);

                // Redirection vers l'explorer après sauvegarde réussie
                setTimeout(() => {
                    console.log('✅ Profile saved successfully, redirecting to explorer');
                    window.router.navigate('/explorer');
                }, 1500);
            } else {
                throw new Error(result.error || 'Erreur lors de l\'enregistrement');
            }
        } catch (error) {
            console.error('Profile save error:', error);
            this.showNotification('Erreur lors de l\'enregistrement du profil', 'error');
        } finally {
            // Restaurer le bouton
            const saveBtn = document.querySelector('[data-action="save-profile"]');
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Enregistrer et continuer';
            }
        }
    }

    collectFormData() {
        const form = document.querySelector('[data-component="OnboardingProfilePage"]');
        if (!form) {
            console.error('Form not found');
            return {};
        }

        const data = {};

        // Collecter tous les champs input et select
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.checked) {
                    if (input.name === 'platforms') {
                        if (!data.platforms) data.platforms = [];
                        data.platforms.push(input.value);
                    } else {
                        data[input.name] = input.value;
                    }
                }
            } else if (input.type !== 'hidden' || input.name !== 'industries') {
                if (input.value.trim() !== '') {
                    data[input.name] = input.value.trim();
                }
            }
        });

        // Add industries for startup users - collect from DOM
        if (this.userRole === 'startup') {
            data.industries = this.collectIndustriesFromDOM();
            console.log('🔧 Industries collected from DOM:', data.industries);
        }

        return data;
    }

    // Méthodes de persistance des données de formulaire
    saveDraftData() {
        try {
            const formData = this.collectFormData();
            const userId = this.user?.id;

            // Ne pas sauvegarder si pas d'utilisateur connecté
            if (!userId) {
                console.warn('No user ID found, skipping draft save');
                return;
            }

            const draftKey = `onboarding_draft_${userId}_${this.userRole || 'creator'}`;

            // Ajouter les industries et plateformes
            formData.industries = this.industries;
            formData.platforms = this.platforms;

            localStorage.setItem(draftKey, JSON.stringify({
                ...formData,
                timestamp: Date.now(),
                userId: userId // Ajouter l'ID utilisateur pour vérification
            }));

            console.log('📝 Draft data saved for user:', userId);
        } catch (error) {
            console.warn('Failed to save draft data:', error);
        }
    }

    loadDraftData() {
        try {
            const userId = this.user?.id;

            // Ne pas charger si pas d'utilisateur connecté
            if (!userId) {
                console.warn('No user ID found, skipping draft load');
                return;
            }

            const draftKey = `onboarding_draft_${userId}_${this.userRole || 'creator'}`;
            const saved = localStorage.getItem(draftKey);

            if (saved) {
                const draftData = JSON.parse(saved);

                // Vérification de sécurité : s'assurer que les données appartiennent au bon utilisateur
                if (draftData.userId && draftData.userId !== userId) {
                    console.warn('Draft data belongs to different user, clearing');
                    localStorage.removeItem(draftKey);
                    return;
                }

                // Vérifier que les données ne sont pas trop anciennes (24h)
                const maxAge = 24 * 60 * 60 * 1000; // 24 heures
                if (Date.now() - draftData.timestamp < maxAge) {
                    this.draftData = draftData;
                    this.industries = draftData.industries || [];
                    this.platforms = draftData.platforms || [];
                    console.log('📝 Draft data loaded for user:', userId);
                } else {
                    // Supprimer les données expirées
                    localStorage.removeItem(draftKey);
                    console.log('📝 Expired draft data removed for user:', userId);
                }
            }
        } catch (error) {
            console.warn('Failed to load draft data:', error);
        }
    }

    clearDraftData() {
        try {
            const userId = this.user?.id;

            if (!userId) {
                console.warn('No user ID found, skipping draft clear');
                return;
            }

            const draftKey = `onboarding_draft_${userId}_${this.userRole || 'creator'}`;
            localStorage.removeItem(draftKey);
            console.log('📝 Draft data cleared for user:', userId);
        } catch (error) {
            console.warn('Failed to clear draft data:', error);
        }
    }

    // Nettoyer toutes les anciennes données de brouillon (sécurité)
    static clearAllDraftData() {
        try {
            const keysToRemove = [];

            // Parcourir toutes les clés localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('onboarding_draft_')) {
                    keysToRemove.push(key);
                }
            }

            // Supprimer toutes les clés de brouillon
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            if (keysToRemove.length > 0) {
                console.log('📝 Cleared all draft data keys:', keysToRemove.length);
            }
        } catch (error) {
            console.warn('Failed to clear all draft data:', error);
        }
    }

    populateFormFromDraft() {
        if (!this.draftData) return;

        // Remplir les champs de formulaire
        Object.entries(this.draftData).forEach(([key, value]) => {
            if (key === 'industries' || key === 'platforms' || key === 'timestamp') return;

            const element = document.getElementById(key);
            if (element && value) {
                element.value = value;
            }
        });

        // Mettre à jour l'affichage des industries
        if (this.industries.length > 0) {
            this.updateIndustriesDisplay();
        }
    }

    collectIndustriesFromDOM() {
        const industriesContainer = document.getElementById('industriesList');
        if (!industriesContainer) {
            console.log('❌ Industries container not found');
            return [];
        }

        const industrySpans = industriesContainer.querySelectorAll('span[class*="inline-flex"]');
        const industries = [];

        industrySpans.forEach(span => {
            // Get the text content, excluding the close button
            const textNodes = [];
            span.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node.textContent.trim());
                }
            });

            const industryText = textNodes.join('').trim();
            if (industryText) {
                industries.push(industryText);
            }
        });

        console.log('🔧 Industries found in DOM:', industries);
        return industries;
    }

    validateProfileData(data) {
        const userRole = this.userRole;
        const requiredFields = ['firstName', 'lastName', 'country'];

        console.log('🔧 Validation debug:', {
            userRole,
            industries: data.industries,
            industriesLength: data.industries?.length,
            data
        });

        if (userRole === 'startup') {
            requiredFields.push('companyName', 'productLink');

            // Validate industries
            if (!data.industries || data.industries.length === 0) {
                console.log('❌ Industries validation failed:', data.industries);
                this.showNotification('At least one industry is required', 'error');
                return false;
            }

            // Validate product link format
            if (data.productLink && !this.isValidUrl(data.productLink)) {
                this.showNotification('Please enter a valid URL for your product link', 'error');
                return false;
            }
        } else {
            requiredFields.push('creatorName');
        }

        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showNotification(`The field ${this.getFieldLabel(field)} is required`, 'error');
                return false;
            }
        }

        return true;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    getFieldLabel(field) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            country: 'Country',
            companyName: 'Company Name',
            productLink: 'Product Link',
            creatorName: 'Creator Name'
        };
        return labels[field] || field;
    }

    async handleBackToRole() {
        try {
            const confirmed = await window.modalManager.confirm(
                'Voulez-vous vraiment changer de rôle ? Vos informations de profil actuelles seront perdues.',
                {
                    title: 'Changer de rôle',
                    confirmText: 'Oui, changer',
                    cancelText: 'Annuler'
                }
            );

            if (confirmed) {
                // Rediriger vers la sélection de rôle
                window.router.navigate('/onboarding/role');
            }
        } catch (error) {
            console.error('Back to role error:', error);
            // En cas d'erreur avec la modal, rediriger quand même
            window.router.navigate('/onboarding/role');
        }
    }

    async handleBudgetSubmit(form) {
        const formData = new FormData(form);
        const amount = parseFloat(formData.get('amount'));
        
        if (amount < 50) {
            this.showNotification('Le budget minimum est de 50€', 'error');
            return;
        }
        
        try {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Redirection vers Stripe...';
            
            // Créer une session Stripe Checkout
            const result = await window.apiManager.createStripeSession('checkout', {
                amount: amount,
                success_url: `${window.location.origin}/onboarding/success`,
                cancel_url: `${window.location.origin}/onboarding/profile`
            });
            
            if (result.success) {
                // Redirection vers Stripe sera gérée par l'Edge Function
                this.showNotification('Redirection vers Stripe...', 'info');
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Budget submission error:', error);
            this.showNotification('Erreur lors de la configuration du budget', 'error');
        }
    }
    
    async handleStripeConnect() {
        try {
            this.showLoading('Redirection vers Stripe...');
            
            const result = await window.apiManager.createStripeSession('connect', {
                return_url: `${window.location.origin}/onboarding/success`,
                refresh_url: `${window.location.origin}/onboarding/profile`
            });
            
            if (result.success) {
                // Redirection vers Stripe sera gérée par l'Edge Function
                this.showNotification('Redirection vers Stripe...', 'info');
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            this.hideLoading();
            console.error('Stripe Connect error:', error);
            this.showNotification('Erreur lors de la configuration des paiements', 'error');
        }
    }
    
    async handleSkip() {
        try {
            const confirmed = await window.modalManager.confirm(
                'Voulez-vous vraiment passer cette étape ? Vous pourrez compléter votre profil plus tard dans vos paramètres.',
                {
                    title: 'Passer cette étape',
                    confirmText: 'Continuer',
                    cancelText: 'Rester ici'
                }
            );

            if (confirmed) {
                // Marquer l'onboarding comme terminé (même sans profil complet)
                await window.appState.setOnboardingCompleted(true);

                // Plus de redirection automatique
                this.showNotification('Onboarding terminé ! Vous pouvez maintenant naviguer librement.', 'success');
            }
        } catch (error) {
            console.error('Skip error:', error);
            // En cas d'erreur avec la modal, continuer quand même
            await window.appState.setOnboardingCompleted(true);
            this.showNotification('Onboarding terminé !', 'success');
        }
    }
}

// Alias pour compatibilité
const OnboardingStripePage = OnboardingProfilePage;

console.log('🔧 Onboarding Pages loaded');
