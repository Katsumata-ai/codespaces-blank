// Page Création Campagne - Dafnck Army
class CampaignCreatePage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Créer une Campagne - Dafnck Army';
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {};
    }
    
    render() {
        return `
            <div class="min-h-screen bg-gray-50" data-component="CampaignCreatePage">
                <!-- Header avec progression -->
                ${this.renderHeader()}
                
                <!-- Contenu principal -->
                <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    ${this.renderStepContent()}
                </main>
            </div>
        `;
    }
    
    renderHeader() {
        return `
            <header class="bg-white shadow-sm border-b border-gray-200">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <button class="text-gray-500 hover:text-gray-700" data-action="back">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">Créer une campagne</h1>
                                <p class="text-sm text-gray-600">Étape ${this.currentStep} sur ${this.totalSteps}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4">
                            <button class="text-gray-500 hover:text-gray-700 text-sm" data-action="save-draft">
                                💾 Sauvegarder brouillon
                            </button>
                        </div>
                    </div>
                    
                    <!-- Barre de progression -->
                    <div class="mt-6">
                        <div class="flex items-center">
                            ${this.renderProgressSteps()}
                        </div>
                        <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-red-600 h-2 rounded-full transition-all duration-300" style="width: ${(this.currentStep / this.totalSteps) * 100}%"></div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
    
    renderProgressSteps() {
        const steps = [
            { id: 1, name: 'Informations', icon: '📝' },
            { id: 2, name: 'Objectifs', icon: '🎯' },
            { id: 3, name: 'Contenu', icon: '🎥' },
            { id: 4, name: 'Créateurs', icon: '👥' },
            { id: 5, name: 'Validation', icon: '✅' }
        ];
        
        return steps.map(step => {
            const isActive = step.id === this.currentStep;
            const isCompleted = step.id < this.currentStep;
            const isAccessible = step.id <= this.currentStep;
            
            return `
                <div class="flex items-center ${step.id < steps.length ? 'flex-1' : ''}">
                    <button class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                        isCompleted 
                            ? 'bg-red-600 border-red-600 text-white' 
                            : isActive 
                                ? 'border-red-600 text-red-600 bg-white'
                                : 'border-gray-300 text-gray-400 bg-white'
                    } ${isAccessible ? 'cursor-pointer hover:border-red-500' : 'cursor-not-allowed'}" 
                    data-action="go-to-step" 
                    data-step="${step.id}"
                    ${!isAccessible ? 'disabled' : ''}>
                        ${isCompleted ? '✓' : step.icon}
                    </button>
                    <span class="ml-2 text-sm font-medium ${isActive ? 'text-red-600' : 'text-gray-500'}">${step.name}</span>
                    ${step.id < steps.length ? '<div class="flex-1 h-0.5 bg-gray-300 mx-4"></div>' : ''}
                </div>
            `;
        }).join('');
    }
    
    renderStepContent() {
        switch(this.currentStep) {
            case 1:
                return this.renderStep1_BasicInfo();
            case 2:
                return this.renderStep2_Objectives();
            case 3:
                return this.renderStep3_ContentType();
            case 4:
                return this.renderStep4_CreatorCriteria();
            case 5:
                return this.renderStep5_Validation();
            default:
                return this.renderStep1_BasicInfo();
        }
    }
    
    renderStep1_BasicInfo() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">Informations de base</h2>
                    <p class="text-gray-600">Donnez-nous les détails essentiels de votre campagne</p>
                </div>
                
                <form class="space-y-6" data-step="1">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Nom de la campagne *
                        </label>
                        <input type="text" 
                               name="campaign_name" 
                               value="${this.formData.campaign_name || ''}"
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                               placeholder="Ex: Lancement Produit Révolutionnaire"
                               required>
                        <p class="text-sm text-gray-500 mt-1">Choisissez un nom accrocheur et descriptif</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Description de la campagne *
                        </label>
                        <textarea name="description" 
                                  rows="4" 
                                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                  placeholder="Décrivez votre produit, votre marque et ce que vous attendez des créateurs..."
                                  required>${this.formData.description || ''}</textarea>
                        <p class="text-sm text-gray-500 mt-1">Plus vous êtes précis, mieux les créateurs pourront vous aider</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Secteur d'activité *
                            </label>
                            <select name="industry" 
                                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    required>
                                <option value="">Sélectionnez un secteur</option>
                                <option value="tech" ${this.formData.industry === 'tech' ? 'selected' : ''}>Technologie</option>
                                <option value="fashion" ${this.formData.industry === 'fashion' ? 'selected' : ''}>Mode & Beauté</option>
                                <option value="food" ${this.formData.industry === 'food' ? 'selected' : ''}>Alimentation</option>
                                <option value="lifestyle" ${this.formData.industry === 'lifestyle' ? 'selected' : ''}>Lifestyle</option>
                                <option value="fitness" ${this.formData.industry === 'fitness' ? 'selected' : ''}>Sport & Fitness</option>
                                <option value="gaming" ${this.formData.industry === 'gaming' ? 'selected' : ''}>Gaming</option>
                                <option value="education" ${this.formData.industry === 'education' ? 'selected' : ''}>Éducation</option>
                                <option value="other" ${this.formData.industry === 'other' ? 'selected' : ''}>Autre</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Durée de la campagne *
                            </label>
                            <select name="duration" 
                                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    required>
                                <option value="">Sélectionnez une durée</option>
                                <option value="7" ${this.formData.duration === '7' ? 'selected' : ''}>1 semaine</option>
                                <option value="14" ${this.formData.duration === '14' ? 'selected' : ''}>2 semaines</option>
                                <option value="30" ${this.formData.duration === '30' ? 'selected' : ''}>1 mois</option>
                                <option value="60" ${this.formData.duration === '60' ? 'selected' : ''}>2 mois</option>
                                <option value="90" ${this.formData.duration === '90' ? 'selected' : ''}>3 mois</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Site web ou lien produit
                        </label>
                        <input type="url" 
                               name="website" 
                               value="${this.formData.website || ''}"
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                               placeholder="https://votre-site.com">
                        <p class="text-sm text-gray-500 mt-1">Optionnel : Lien vers votre site ou page produit</p>
                    </div>
                </form>
                
                <!-- Navigation -->
                <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button class="text-gray-500 hover:text-gray-700" data-action="back">
                        ← Retour à l'explorer
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors" data-action="next-step">
                        Continuer →
                    </button>
                </div>
            </div>
        `;
    }
    
    renderStep2_Objectives() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">Objectifs & Budget</h2>
                    <p class="text-gray-600">Définissez vos objectifs et votre budget pour cette campagne</p>
                </div>
                
                <form class="space-y-6" data-step="2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-4">
                            Quels sont vos objectifs principaux ? *
                        </label>
                        <div class="space-y-3">
                            ${this.renderCheckboxOption('awareness', 'Augmenter la notoriété de ma marque', '📢')}
                            ${this.renderCheckboxOption('leads', 'Générer des leads et prospects', '🎯')}
                            ${this.renderCheckboxOption('sales', 'Augmenter les ventes', '💰')}
                            ${this.renderCheckboxOption('launch', 'Lancer un nouveau produit', '🚀')}
                            ${this.renderCheckboxOption('engagement', 'Améliorer l\'engagement communauté', '❤️')}
                            ${this.renderCheckboxOption('traffic', 'Augmenter le trafic web', '🌐')}
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Budget total de la campagne * (en €)
                        </label>
                        <div class="relative">
                            <input type="number" 
                                   name="budget" 
                                   value="${this.formData.budget || ''}"
                                   min="100" 
                                   step="50"
                                   class="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                   placeholder="1000"
                                   required>
                            <span class="absolute right-4 top-3 text-gray-500">€</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">Budget minimum recommandé : 500€</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de créateurs souhaités *
                        </label>
                        <select name="creators_count" 
                                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                required>
                            <option value="">Sélectionnez un nombre</option>
                            <option value="1-3" ${this.formData.creators_count === '1-3' ? 'selected' : ''}>1-3 créateurs</option>
                            <option value="4-6" ${this.formData.creators_count === '4-6' ? 'selected' : ''}>4-6 créateurs</option>
                            <option value="7-10" ${this.formData.creators_count === '7-10' ? 'selected' : ''}>7-10 créateurs</option>
                            <option value="10+" ${this.formData.creators_count === '10+' ? 'selected' : ''}>Plus de 10 créateurs</option>
                        </select>
                    </div>
                </form>
                
                <!-- Navigation -->
                <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button class="text-gray-500 hover:text-gray-700" data-action="prev-step">
                        ← Étape précédente
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors" data-action="next-step">
                        Continuer →
                    </button>
                </div>
            </div>
        `;
    }

    renderCheckboxOption(value, label, icon) {
        const isChecked = this.formData.objectives && this.formData.objectives.includes(value);
        return `
            <label class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox"
                       name="objectives"
                       value="${value}"
                       ${isChecked ? 'checked' : ''}
                       class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500">
                <span class="ml-3 text-2xl">${icon}</span>
                <span class="ml-3 text-sm font-medium text-gray-900">${label}</span>
            </label>
        `;
    }

    renderStep3_ContentType() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">Type de contenu</h2>
                    <p class="text-gray-600">Quel type de contenu souhaitez-vous que les créateurs produisent ?</p>
                </div>

                <form class="space-y-6" data-step="3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-4">
                            Formats de contenu souhaités * (plusieurs choix possibles)
                        </label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${this.renderContentTypeOption('video_review', 'Vidéo Review', '🎥', 'Review détaillée du produit')}
                            ${this.renderContentTypeOption('unboxing', 'Unboxing', '📦', 'Déballage et première impression')}
                            ${this.renderContentTypeOption('tutorial', 'Tutoriel', '📚', 'Comment utiliser le produit')}
                            ${this.renderContentTypeOption('lifestyle', 'Lifestyle', '✨', 'Intégration dans le quotidien')}
                            ${this.renderContentTypeOption('story', 'Stories', '📱', 'Stories Instagram/TikTok')}
                            ${this.renderContentTypeOption('post', 'Post', '📸', 'Post avec photos')}
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Plateformes cibles *
                        </label>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            ${this.renderPlatformOption('instagram', 'Instagram', '📷')}
                            ${this.renderPlatformOption('tiktok', 'TikTok', '🎵')}
                            ${this.renderPlatformOption('youtube', 'YouTube', '📺')}
                            ${this.renderPlatformOption('twitter', 'Twitter/X', '🐦')}
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Instructions spéciales pour les créateurs
                        </label>
                        <textarea name="special_instructions"
                                  rows="4"
                                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                  placeholder="Points clés à mentionner, éléments à éviter, ton souhaité...">${this.formData.special_instructions || ''}</textarea>
                    </div>
                </form>

                <!-- Navigation -->
                <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button class="text-gray-500 hover:text-gray-700" data-action="prev-step">
                        ← Étape précédente
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors" data-action="next-step">
                        Continuer →
                    </button>
                </div>
            </div>
        `;
    }

    renderContentTypeOption(value, label, icon, description) {
        const isChecked = this.formData.content_types && this.formData.content_types.includes(value);
        return `
            <label class="flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${isChecked ? 'border-red-500 bg-red-50' : ''}">
                <div class="flex items-center">
                    <input type="checkbox"
                           name="content_types"
                           value="${value}"
                           ${isChecked ? 'checked' : ''}
                           class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500">
                    <span class="ml-3 text-2xl">${icon}</span>
                    <span class="ml-3 font-medium text-gray-900">${label}</span>
                </div>
                <p class="text-sm text-gray-500 mt-2 ml-10">${description}</p>
            </label>
        `;
    }

    renderPlatformOption(value, label, icon) {
        const isChecked = this.formData.platforms && this.formData.platforms.includes(value);
        return `
            <label class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${isChecked ? 'border-red-500 bg-red-50' : ''}">
                <input type="checkbox"
                       name="platforms"
                       value="${value}"
                       ${isChecked ? 'checked' : ''}
                       class="sr-only">
                <span class="text-3xl mb-2">${icon}</span>
                <span class="text-sm font-medium text-gray-900">${label}</span>
            </label>
        `;
    }

    renderStep4_CreatorCriteria() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">Critères des créateurs</h2>
                    <p class="text-gray-600">Définissez le profil des créateurs que vous recherchez</p>
                </div>

                <form class="space-y-6" data-step="4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Taille d'audience souhaitée
                        </label>
                        <div class="space-y-3">
                            ${this.renderRadioOption('audience_size', 'micro', 'Micro-influenceurs (1K - 10K)', '👥')}
                            ${this.renderRadioOption('audience_size', 'mid', 'Influenceurs moyens (10K - 100K)', '👥👥')}
                            ${this.renderRadioOption('audience_size', 'macro', 'Macro-influenceurs (100K - 1M)', '👥👥👥')}
                            ${this.renderRadioOption('audience_size', 'mega', 'Méga-influenceurs (1M+)', '👥👥👥👥')}
                            ${this.renderRadioOption('audience_size', 'any', 'Pas de préférence', '🤷')}
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Localisation géographique
                        </label>
                        <select name="location"
                                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                            <option value="">Pas de préférence</option>
                            <option value="france" ${this.formData.location === 'france' ? 'selected' : ''}>France</option>
                            <option value="europe" ${this.formData.location === 'europe' ? 'selected' : ''}>Europe</option>
                            <option value="north_america" ${this.formData.location === 'north_america' ? 'selected' : ''}>Amérique du Nord</option>
                            <option value="global" ${this.formData.location === 'global' ? 'selected' : ''}>International</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Âge de l'audience cible
                        </label>
                        <select name="target_age"
                                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                            <option value="">Pas de préférence</option>
                            <option value="13-17" ${this.formData.target_age === '13-17' ? 'selected' : ''}>13-17 ans (Gen Z jeune)</option>
                            <option value="18-24" ${this.formData.target_age === '18-24' ? 'selected' : ''}>18-24 ans (Gen Z)</option>
                            <option value="25-34" ${this.formData.target_age === '25-34' ? 'selected' : ''}>25-34 ans (Millennials)</option>
                            <option value="35-44" ${this.formData.target_age === '35-44' ? 'selected' : ''}>35-44 ans (Gen X jeune)</option>
                            <option value="45+" ${this.formData.target_age === '45+' ? 'selected' : ''}>45+ ans</option>
                        </select>
                    </div>
                </form>

                <!-- Navigation -->
                <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button class="text-gray-500 hover:text-gray-700" data-action="prev-step">
                        ← Étape précédente
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors" data-action="next-step">
                        Continuer →
                    </button>
                </div>
            </div>
        `;
    }

    renderRadioOption(name, value, label, icon) {
        const isChecked = this.formData[name] === value;
        return `
            <label class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${isChecked ? 'border-red-500 bg-red-50' : ''}">
                <input type="radio"
                       name="${name}"
                       value="${value}"
                       ${isChecked ? 'checked' : ''}
                       class="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500">
                <span class="ml-3 text-2xl">${icon}</span>
                <span class="ml-3 text-sm font-medium text-gray-900">${label}</span>
            </label>
        `;
    }

    renderStep5_Validation() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">Validation & Lancement</h2>
                    <p class="text-gray-600">Vérifiez les informations et lancez votre campagne</p>
                </div>

                <!-- Résumé de la campagne -->
                <div class="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Résumé de votre campagne</h3>
                    ${this.renderCampaignSummary()}
                </div>

                <!-- Conditions -->
                <div class="space-y-4 mb-6">
                    <label class="flex items-start">
                        <input type="checkbox" name="terms" required class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1">
                        <span class="ml-3 text-sm text-gray-700">
                            J'accepte les <a href="#" class="text-red-600 hover:text-red-700">conditions d'utilisation</a> et la <a href="#" class="text-red-600 hover:text-red-700">politique de confidentialité</a>
                        </span>
                    </label>

                    <label class="flex items-start">
                        <input type="checkbox" name="budget_confirm" required class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1">
                        <span class="ml-3 text-sm text-gray-700">
                            Je confirme disposer du budget nécessaire pour cette campagne
                        </span>
                    </label>
                </div>

                <!-- Navigation -->
                <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <button class="text-gray-500 hover:text-gray-700" data-action="prev-step">
                        ← Étape précédente
                    </button>
                    <div class="flex space-x-4">
                        <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors" data-action="save-draft">
                            💾 Sauvegarder brouillon
                        </button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold" data-action="submit-campaign">
                            🚀 Lancer la campagne
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCampaignSummary() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-medium text-gray-900 mb-2">Informations générales</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li><strong>Nom :</strong> ${this.formData.campaign_name || 'Non défini'}</li>
                        <li><strong>Secteur :</strong> ${this.formData.industry || 'Non défini'}</li>
                        <li><strong>Durée :</strong> ${this.formData.duration || 'Non défini'} jours</li>
                        <li><strong>Budget :</strong> ${this.formData.budget || 'Non défini'}€</li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-medium text-gray-900 mb-2">Objectifs & Contenu</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li><strong>Objectifs :</strong> ${this.formData.objectives ? this.formData.objectives.length + ' sélectionnés' : 'Non définis'}</li>
                        <li><strong>Types de contenu :</strong> ${this.formData.content_types ? this.formData.content_types.length + ' sélectionnés' : 'Non définis'}</li>
                        <li><strong>Plateformes :</strong> ${this.formData.platforms ? this.formData.platforms.length + ' sélectionnées' : 'Non définies'}</li>
                        <li><strong>Créateurs :</strong> ${this.formData.creators_count || 'Non défini'}</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // ===== EVENT HANDLERS & LOGIC =====

    async init() {
        // Event listeners
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                this.handleAction(action.dataset.action, action);
            }
        });

        // Form change listeners pour sauvegarde auto
        this.addEventListener(document, 'change', (e) => {
            if (e.target.form && e.target.form.dataset.step) {
                this.saveFormData(parseInt(e.target.form.dataset.step));
            }
        });

        // Charger les données sauvegardées
        this.loadSavedData();
    }

    handleAction(action, element) {
        switch (action) {
            case 'back':
                this.router.navigate('/explorer');
                break;
            case 'next-step':
                this.nextStep();
                break;
            case 'prev-step':
                this.prevStep();
                break;
            case 'go-to-step':
                const step = parseInt(element.dataset.step);
                if (step <= this.currentStep) {
                    this.goToStep(step);
                }
                break;
            case 'save-draft':
                this.saveDraft();
                break;
            case 'submit-campaign':
                this.submitCampaign();
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }

    async nextStep() {
        // Valider l'étape actuelle
        if (!this.validateCurrentStep()) {
            return;
        }

        // Sauvegarder les données
        this.saveFormData(this.currentStep);

        // Passer à l'étape suivante
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.reRender();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.reRender();
        }
    }

    goToStep(step) {
        this.currentStep = step;
        this.reRender();
    }

    validateCurrentStep() {
        const form = document.querySelector(`form[data-step="${this.currentStep}"]`);
        if (!form) return true;

        // Validation HTML5 native
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        // Validations spécifiques par étape
        switch (this.currentStep) {
            case 2:
                // Vérifier qu'au moins un objectif est sélectionné
                const objectives = form.querySelectorAll('input[name="objectives"]:checked');
                if (objectives.length === 0) {
                    this.showNotification('Veuillez sélectionner au moins un objectif', 'error');
                    return false;
                }
                break;
            case 3:
                // Vérifier qu'au moins un type de contenu et une plateforme sont sélectionnés
                const contentTypes = form.querySelectorAll('input[name="content_types"]:checked');
                const platforms = form.querySelectorAll('input[name="platforms"]:checked');
                if (contentTypes.length === 0) {
                    this.showNotification('Veuillez sélectionner au moins un type de contenu', 'error');
                    return false;
                }
                if (platforms.length === 0) {
                    this.showNotification('Veuillez sélectionner au moins une plateforme', 'error');
                    return false;
                }
                break;
        }

        return true;
    }

    saveFormData(step) {
        const form = document.querySelector(`form[data-step="${step}"]`);
        if (!form) return;

        const formData = new FormData(form);

        // Traitement spécial pour les checkboxes multiples
        const checkboxGroups = ['objectives', 'content_types', 'platforms'];
        checkboxGroups.forEach(group => {
            const values = formData.getAll(group);
            if (values.length > 0) {
                this.formData[group] = values;
            }
        });

        // Autres champs
        for (let [key, value] of formData.entries()) {
            if (!checkboxGroups.includes(key)) {
                this.formData[key] = value;
            }
        }

        // Sauvegarder dans localStorage avec isolation utilisateur
        const userId = this.user?.id;
        if (userId) {
            const draftKey = `campaign_draft_${userId}`;
            localStorage.setItem(draftKey, JSON.stringify({
                ...this.formData,
                userId: userId,
                timestamp: Date.now()
            }));
        }
    }

    loadSavedData() {
        const userId = this.user?.id;
        if (!userId) return;

        const draftKey = `campaign_draft_${userId}`;
        const saved = localStorage.getItem(draftKey);
        if (saved) {
            try {
                const draftData = JSON.parse(saved);

                // Vérification de sécurité
                if (draftData.userId && draftData.userId !== userId) {
                    console.warn('Campaign draft belongs to different user, clearing');
                    localStorage.removeItem(draftKey);
                    return;
                }

                // Vérifier l'âge des données (24h)
                const maxAge = 24 * 60 * 60 * 1000;
                if (draftData.timestamp && (Date.now() - draftData.timestamp) > maxAge) {
                    localStorage.removeItem(draftKey);
                    return;
                }

                this.formData = draftData;
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }

    async saveDraft() {
        this.saveFormData(this.currentStep);
        this.showNotification('Brouillon sauvegardé !', 'success');
    }

    async submitCampaign() {
        // Valider la dernière étape
        if (!this.validateCurrentStep()) {
            return;
        }

        // Sauvegarder les données finales
        this.saveFormData(this.currentStep);

        try {
            // TODO: Envoyer à l'API
            console.log('Campaign data:', this.formData);

            // Simulation d'envoi
            this.showNotification('Envoi en cours...', 'info');

            // Simuler un délai
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Sauvegarder la campagne localement pour simulation
            const campaigns = JSON.parse(localStorage.getItem('user_campaigns') || '[]');
            const newCampaign = {
                id: Date.now().toString(),
                ...this.formData,
                status: 'active',
                created_at: new Date().toISOString(),
                views: 0,
                engagement: 0,
                roi: 0
            };
            campaigns.push(newCampaign);
            localStorage.setItem('user_campaigns', JSON.stringify(campaigns));

            // Succès
            this.showNotification('Campagne créée avec succès !', 'success');

            // Nettoyer le brouillon
            localStorage.removeItem('campaign_draft');

            // Rediriger vers explorer
            setTimeout(() => {
                this.router.navigate('/explorer');
            }, 1500);

        } catch (error) {
            console.error('Error submitting campaign:', error);
            this.showNotification('Erreur lors de la création de la campagne', 'error');
        }
    }

    reRender() {
        // Mettre à jour seulement le header et le contenu principal
        const headerContainer = document.querySelector('header');
        const mainContainer = document.querySelector('main');

        if (headerContainer && mainContainer) {
            // Créer un élément temporaire pour parser le nouveau HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.render();

            // Extraire le nouveau header et main
            const newHeader = tempDiv.querySelector('header');
            const newMain = tempDiv.querySelector('main');

            if (newHeader && newMain) {
                headerContainer.innerHTML = newHeader.innerHTML;
                mainContainer.innerHTML = newMain.innerHTML;

                // Réattacher les event listeners
                this.init();
            }
        }
    }
}

console.log('🔧 Campaign Create Page loaded');
