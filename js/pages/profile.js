// Page Profile pour Dafnck Army
class ProfilePage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Mon Profil - Dafnck Army';
        this.activeTab = 'general';
    }
    
    async render() {
        const user = this.user;
        const userRole = this.userRole;
        
        return `
            <div class="profile-page" data-component="ProfilePage">
                <div class="profile-container">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <img src="${user.avatar_url || 'assets/default-avatar.svg'}" alt="Avatar">
                            <button class="avatar-edit" data-action="change-avatar">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div class="profile-info">
                            <h1>${Formatters.username(user.email)}</h1>
                            <p class="profile-role">${Formatters.role(userRole)}</p>
                            <p class="profile-email">${user.email}</p>
                        </div>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <div class="stat-value" data-stat="member-since">-</div>
                                <div class="stat-label">Membre depuis</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" data-stat="total-activity">-</div>
                                <div class="stat-label">${userRole === 'startup' ? 'Campagnes' : 'Missions'}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-content">
                        <div class="profile-tabs">
                            <button class="tab-btn ${this.activeTab === 'general' ? 'active' : ''}" 
                                    data-tab="general">
                                Informations générales
                            </button>
                            <button class="tab-btn ${this.activeTab === 'security' ? 'active' : ''}" 
                                    data-tab="security">
                                Sécurité
                            </button>
                            <button class="tab-btn ${this.activeTab === 'payments' ? 'active' : ''}" 
                                    data-tab="payments">
                                Paiements
                            </button>
                            <button class="tab-btn ${this.activeTab === 'notifications' ? 'active' : ''}" 
                                    data-tab="notifications">
                                Notifications
                            </button>
                        </div>
                        
                        <div class="profile-tab-content">
                            ${this.renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderTabContent() {
        switch (this.activeTab) {
            case 'general':
                return this.renderGeneralTab();
            case 'security':
                return this.renderSecurityTab();
            case 'payments':
                return this.renderPaymentsTab();
            case 'notifications':
                return this.renderNotificationsTab();
            default:
                return this.renderGeneralTab();
        }
    }
    
    renderGeneralTab() {
        const user = this.user;
        const userRole = this.userRole;
        
        return `
            <div class="tab-content" data-tab-content="general">
                <div class="section">
                    <h3>Informations personnelles</h3>
                    
                    <form class="profile-form" data-form="general">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Prénom</label>
                                <input type="text" name="first_name" class="form-input" 
                                       value="${user.first_name || ''}" placeholder="Votre prénom">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nom</label>
                                <input type="text" name="last_name" class="form-input" 
                                       value="${user.last_name || ''}" placeholder="Votre nom">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-input" 
                                   value="${user.email}" readonly>
                            <small class="form-help">L'email ne peut pas être modifié</small>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Bio</label>
                            <textarea name="bio" class="form-input" rows="4" 
                                      placeholder="Parlez-nous de vous...">${user.bio || ''}</textarea>
                        </div>
                        
                        ${userRole === 'creator' ? `
                            <div class="form-group">
                                <label class="form-label">Réseaux sociaux</label>
                                <div class="social-inputs">
                                    <div class="input-group">
                                        <span class="input-prefix">@</span>
                                        <input type="text" name="tiktok_username" class="form-input" 
                                               value="${user.tiktok_username || ''}" placeholder="TikTok">
                                    </div>
                                    <div class="input-group">
                                        <span class="input-prefix">@</span>
                                        <input type="text" name="youtube_username" class="form-input" 
                                               value="${user.youtube_username || ''}" placeholder="YouTube">
                                    </div>
                                    <div class="input-group">
                                        <span class="input-prefix">@</span>
                                        <input type="text" name="instagram_username" class="form-input" 
                                               value="${user.instagram_username || ''}" placeholder="Instagram">
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                Sauvegarder les modifications
                            </button>
                        </div>
                    </form>
                </div>
                
                <div class="section">
                    <h3>Préférences</h3>
                    
                    <form class="profile-form" data-form="preferences">
                        <div class="form-group">
                            <label class="form-label">Langue</label>
                            <select name="language" class="form-input">
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Fuseau horaire</label>
                            <select name="timezone" class="form-input">
                                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                                <option value="Europe/London">Europe/London (UTC+0)</option>
                                <option value="America/New_York">America/New_York (UTC-5)</option>
                            </select>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
    
    renderSecurityTab() {
        return `
            <div class="tab-content" data-tab-content="security">
                <div class="section">
                    <h3>Changer le mot de passe</h3>
                    
                    <form class="profile-form" data-form="password">
                        <div class="form-group">
                            <label class="form-label">Mot de passe actuel</label>
                            <input type="password" name="current_password" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Nouveau mot de passe</label>
                            <input type="password" name="new_password" class="form-input" required>
                            <small class="form-help">Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre</small>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Confirmer le nouveau mot de passe</label>
                            <input type="password" name="confirm_password" class="form-input" required>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                Changer le mot de passe
                            </button>
                        </div>
                    </form>
                </div>
                
                <div class="section">
                    <h3>Authentification à deux facteurs</h3>
                    <p>Sécurisez votre compte avec l'authentification à deux facteurs.</p>
                    
                    <div class="security-option">
                        <div class="option-info">
                            <h4>Authentification par SMS</h4>
                            <p>Recevez un code par SMS lors de la connexion</p>
                        </div>
                        <button class="btn btn-ghost" data-action="setup-2fa-sms">
                            Configurer
                        </button>
                    </div>
                    
                    <div class="security-option">
                        <div class="option-info">
                            <h4>Application d'authentification</h4>
                            <p>Utilisez Google Authenticator ou une app similaire</p>
                        </div>
                        <button class="btn btn-ghost" data-action="setup-2fa-app">
                            Configurer
                        </button>
                    </div>
                </div>
                
                <div class="section danger-zone">
                    <h3>Zone de danger</h3>
                    
                    <div class="danger-action">
                        <div class="action-info">
                            <h4>Supprimer mon compte</h4>
                            <p>Cette action est irréversible. Toutes vos données seront supprimées.</p>
                        </div>
                        <button class="btn btn-danger" data-action="delete-account">
                            Supprimer le compte
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderPaymentsTab() {
        const userRole = this.userRole;
        
        return `
            <div class="tab-content" data-tab-content="payments">
                ${userRole === 'startup' ? this.renderStartupPayments() : this.renderCreatorPayments()}
            </div>
        `;
    }
    
    renderStartupPayments() {
        return `
            <div class="section">
                <h3>Budget et paiements</h3>
                
                <div class="payment-summary">
                    <div class="summary-card">
                        <h4>Budget disponible</h4>
                        <div class="amount" data-budget-available>-</div>
                    </div>
                    <div class="summary-card">
                        <h4>Total dépensé</h4>
                        <div class="amount" data-total-spent>-</div>
                    </div>
                </div>
                
                <div class="payment-actions">
                    <button class="btn btn-primary" data-action="add-budget">
                        Recharger le budget
                    </button>
                    <button class="btn btn-ghost" data-action="view-transactions">
                        Voir les transactions
                    </button>
                </div>
            </div>
            
            <div class="section">
                <h3>Méthodes de paiement</h3>
                
                <div class="payment-methods" data-payment-methods>
                    <!-- Les méthodes de paiement seront chargées ici -->
                </div>
                
                <button class="btn btn-ghost" data-action="add-payment-method">
                    Ajouter une méthode de paiement
                </button>
            </div>
        `;
    }
    
    renderCreatorPayments() {
        return `
            <div class="section">
                <h3>Gains et paiements</h3>
                
                <div class="payment-summary">
                    <div class="summary-card">
                        <h4>Gains totaux</h4>
                        <div class="amount" data-total-earnings>-</div>
                    </div>
                    <div class="summary-card">
                        <h4>En attente</h4>
                        <div class="amount" data-pending-earnings>-</div>
                    </div>
                </div>
                
                <div class="payment-actions">
                    <button class="btn btn-primary" data-action="view-earnings">
                        Voir mes gains
                    </button>
                    <button class="btn btn-ghost" data-action="download-invoice">
                        Télécharger les justificatifs
                    </button>
                </div>
            </div>
            
            <div class="section">
                <h3>Compte bancaire</h3>
                
                <div class="bank-account" data-bank-account>
                    <!-- Les informations bancaires seront chargées ici -->
                </div>
                
                <button class="btn btn-ghost" data-action="update-bank-account">
                    Mettre à jour le compte bancaire
                </button>
            </div>
        `;
    }
    
    renderNotificationsTab() {
        return `
            <div class="tab-content" data-tab-content="notifications">
                <div class="section">
                    <h3>Préférences de notification</h3>
                    
                    <form class="profile-form" data-form="notifications">
                        <div class="notification-group">
                            <h4>Email</h4>
                            
                            <label class="form-checkbox">
                                <input type="checkbox" name="email_campaigns" checked>
                                <span class="checkbox-mark"></span>
                                Nouvelles campagnes disponibles
                            </label>
                            
                            <label class="form-checkbox">
                                <input type="checkbox" name="email_submissions" checked>
                                <span class="checkbox-mark"></span>
                                Nouvelles soumissions reçues
                            </label>
                            
                            <label class="form-checkbox">
                                <input type="checkbox" name="email_payments" checked>
                                <span class="checkbox-mark"></span>
                                Confirmations de paiement
                            </label>
                            
                            <label class="form-checkbox">
                                <input type="checkbox" name="email_marketing">
                                <span class="checkbox-mark"></span>
                                Actualités et promotions
                            </label>
                        </div>
                        
                        <div class="notification-group">
                            <h4>Notifications push</h4>
                            
                            <label class="form-checkbox">
                                <input type="checkbox" name="push_urgent" checked>
                                <span class="checkbox-mark"></span>
                                Notifications urgentes uniquement
                            </label>
                            
                            <label class="form-checkbox">
                                <input type="checkbox" name="push_all">
                                <span class="checkbox-mark"></span>
                                Toutes les notifications
                            </label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                Sauvegarder les préférences
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
    
    async init() {
        // Event listeners pour les onglets
        this.addEventListener(document, 'click', (e) => {
            const tab = e.target.closest('[data-tab]');
            if (tab) {
                this.switchTab(tab.dataset.tab);
            }
        });
        
        // Event listeners pour les formulaires
        this.addEventListener(document, 'submit', (e) => {
            const form = e.target.closest('[data-form]');
            if (form) {
                e.preventDefault();
                this.handleFormSubmit(form);
            }
        });
        
        // Event listeners pour les actions
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                this.handleAction(action.dataset.action);
            }
        });
        
        // Charger les données du profil
        await this.loadProfileData();
    }
    
    switchTab(tabName) {
        this.activeTab = tabName;
        this.rerender();
    }
    
    async loadProfileData() {
        // Charger les statistiques du profil
        const user = this.user;
        
        // Calculer la date d'inscription
        const memberSince = new Date(user.created_at);
        const memberSinceElement = document.querySelector('[data-stat="member-since"]');
        if (memberSinceElement) {
            memberSinceElement.textContent = Formatters.date(memberSince, { month: 'short', year: 'numeric' });
        }
        
        // Charger les données spécifiques selon l'onglet actif
        if (this.activeTab === 'payments') {
            await this.loadPaymentData();
        }
    }
    
    async loadPaymentData() {
        // Charger les données de paiement selon le rôle
        if (this.userRole === 'startup') {
            // Charger le budget et les dépenses
        } else {
            // Charger les gains et le compte bancaire
        }
    }
    
    async handleFormSubmit(form) {
        const formType = form.dataset.form;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnLoading = new ButtonLoading(submitBtn, 'Sauvegarde...');
            btnLoading.show();
            
            let result;
            
            switch (formType) {
                case 'general':
                case 'preferences':
                    result = await window.apiManager.updateUserProfile(data);
                    break;
                case 'password':
                    result = await this.auth.updatePassword(data.current_password, data.new_password);
                    break;
                case 'notifications':
                    result = await window.apiManager.updateUserProfile({ notification_preferences: data });
                    break;
                default:
                    throw new Error('Type de formulaire non supporté');
            }
            
            btnLoading.hide();
            
            if (result.success) {
                this.showNotification('Modifications sauvegardées !', 'success');
                
                if (formType === 'password') {
                    form.reset();
                }
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Erreur lors de la sauvegarde', 'error');
        }
    }
    
    async handleAction(action) {
        switch (action) {
            case 'change-avatar':
                await this.changeAvatar();
                break;
            case 'add-budget':
                this.router.navigate('/budget?action=add');
                break;
            case 'view-transactions':
                this.router.navigate('/budget?tab=transactions');
                break;
            case 'view-earnings':
                this.router.navigate('/budget?tab=earnings');
                break;
            case 'delete-account':
                await this.deleteAccount();
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }
    
    async changeAvatar() {
        // Créer un input file temporaire
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    this.showLoading('Upload de l\'avatar...');
                    
                    // Upload du fichier (à implémenter avec Supabase Storage)
                    // const result = await this.uploadAvatar(file);
                    
                    this.hideLoading();
                    this.showNotification('Avatar mis à jour !', 'success');
                    
                } catch (error) {
                    this.hideLoading();
                    console.error('Avatar upload error:', error);
                    this.showNotification('Erreur lors de l\'upload', 'error');
                }
            }
        };
        
        input.click();
    }
    
    async deleteAccount() {
        const confirmed = await window.modalManager.confirm(
            'Êtes-vous absolument sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront perdues.',
            {
                title: 'Supprimer le compte',
                confirmText: 'Oui, supprimer définitivement',
                cancelText: 'Annuler'
            }
        );
        
        if (confirmed) {
            try {
                this.showLoading('Suppression du compte...');
                
                // Supprimer le compte (à implémenter)
                // const result = await this.auth.deleteAccount();
                
                this.hideLoading();
                this.showNotification('Compte supprimé', 'success');
                this.router.navigate('/');
                
            } catch (error) {
                this.hideLoading();
                console.error('Account deletion error:', error);
                this.showNotification('Erreur lors de la suppression', 'error');
            }
        }
    }
}

console.log('🔧 Profile Page loaded');
