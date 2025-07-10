// Composant CampaignCard pour Dafnck Army
class CampaignCard extends BaseComponent {
    constructor(campaign, userRole = null) {
        super();
        this.campaign = campaign;
        this.userRole = userRole || this.appState.getState('userRole');
        this.isExpanded = false;
    }
    
    async render() {
        const {
            id,
            title,
            description,
            cpm_rate,
            budget_remaining,
            budget_total,
            status,
            min_views,
            max_views,
            created_at,
            company
        } = this.campaign;
        
        const budgetUsed = budget_total - budget_remaining;
        const budgetProgress = (budgetUsed / budget_total) * 100;
        
        return `
            <div class="campaign-card campaign-card-${status}" data-component="CampaignCard" data-campaign-id="${id}">
                <div class="campaign-header">
                    <div class="campaign-title-section">
                        <h3 class="campaign-title">${this.escapeHtml(title)}</h3>
                        <div class="campaign-meta">
                            <span class="campaign-company">${this.escapeHtml(company?.email || 'Startup')}</span>
                            <span class="campaign-date">${Formatters.relativeDate(created_at)}</span>
                        </div>
                    </div>
                    <div class="campaign-status">
                        <span class="status-badge status-${status}">
                            ${Formatters.status(status)}
                        </span>
                    </div>
                </div>
                
                <div class="campaign-body">
                    <div class="campaign-description ${this.isExpanded ? 'expanded' : ''}">
                        <p>${this.escapeHtml(description || 'Aucune description disponible')}</p>
                        ${description && description.length > 150 ? `
                            <button class="description-toggle" data-action="toggle-description">
                                ${this.isExpanded ? 'Voir moins' : 'Voir plus'}
                            </button>
                        ` : ''}
                    </div>
                    
                    <div class="campaign-metrics">
                        <div class="metric">
                            <div class="metric-value">${Formatters.currency(cpm_rate)}</div>
                            <div class="metric-label">CPM</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${Formatters.currency(budget_remaining)}</div>
                            <div class="metric-label">Budget restant</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${Formatters.compactNumber(min_views)} - ${Formatters.compactNumber(max_views)}</div>
                            <div class="metric-label">Vues cibles</div>
                        </div>
                    </div>
                    
                    <div class="campaign-progress">
                        <div class="progress-header">
                            <span class="progress-label">Budget utilisé</span>
                            <span class="progress-value">${Formatters.percentage(budgetProgress)}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(budgetProgress, 100)}%"></div>
                        </div>
                        <div class="progress-details">
                            <span>${Formatters.currency(budgetUsed)} / ${Formatters.currency(budget_total)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="campaign-footer">
                    ${this.renderActions()}
                </div>
            </div>
        `;
    }
    
    renderActions() {
        const { id, status } = this.campaign;
        
        if (this.userRole === 'startup') {
            // Actions pour les startups
            return `
                <div class="campaign-actions">
                    <button class="btn btn-ghost btn-small" data-action="view-details" data-campaign-id="${id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        Voir détails
                    </button>
                    ${status === 'active' ? `
                        <button class="btn btn-secondary btn-small" data-action="manage-campaign" data-campaign-id="${id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                            Gérer
                        </button>
                    ` : ''}
                </div>
            `;
        } else {
            // Actions pour les créateurs
            return `
                <div class="campaign-actions">
                    <button class="btn btn-ghost btn-small" data-action="view-details" data-campaign-id="${id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        Voir détails
                    </button>
                    ${status === 'active' ? `
                        <button class="btn btn-primary btn-small" data-action="apply-campaign" data-campaign-id="${id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Postuler
                        </button>
                    ` : ''}
                </div>
            `;
        }
    }
    
    async init() {
        // Event listeners pour les actions
        this.addEventListener(this.element, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                e.preventDefault();
                e.stopPropagation();
                this.handleAction(action.dataset.action, action.dataset.campaignId);
            }
        });
        
        // Click sur la carte pour voir les détails
        this.addEventListener(this.element, 'click', (e) => {
            // Ne pas déclencher si on a cliqué sur un bouton
            if (!e.target.closest('button') && !e.target.closest('[data-action]')) {
                this.handleAction('view-details', this.campaign.id);
            }
        });
        
        // Hover effects
        this.addEventListener(this.element, 'mouseenter', () => {
            this.element.classList.add('campaign-card-hover');
        });
        
        this.addEventListener(this.element, 'mouseleave', () => {
            this.element.classList.remove('campaign-card-hover');
        });
    }
    
    async handleAction(action, campaignId) {
        switch (action) {
            case 'toggle-description':
                this.toggleDescription();
                break;
            case 'view-details':
                this.viewDetails(campaignId);
                break;
            case 'apply-campaign':
                await this.applyCampaign(campaignId);
                break;
            case 'manage-campaign':
                this.manageCampaign(campaignId);
                break;
        }
    }
    
    toggleDescription() {
        this.isExpanded = !this.isExpanded;
        const description = this.element.querySelector('.campaign-description');
        const toggle = this.element.querySelector('.description-toggle');
        
        if (description) {
            description.classList.toggle('expanded', this.isExpanded);
        }
        
        if (toggle) {
            toggle.textContent = this.isExpanded ? 'Voir moins' : 'Voir plus';
        }
    }
    
    viewDetails(campaignId) {
        // Ouvrir modal de détails ou naviguer vers la page de détails
        this.router.navigate(`/campaigns/${campaignId}`);
    }
    
    async applyCampaign(campaignId) {
        try {
            // Vérifier si l'utilisateur a déjà postulé
            const existingSubmission = await this.checkExistingSubmission(campaignId);
            
            if (existingSubmission) {
                this.showNotification('Vous avez déjà postulé à cette campagne', 'warning');
                return;
            }
            
            // Ouvrir modal de candidature
            const modalContent = `
                <form class="application-form">
                    <div class="form-group">
                        <label class="form-label">URL de votre vidéo *</label>
                        <input type="url" name="video_url" class="form-input" 
                               placeholder="https://tiktok.com/@user/video/123..." required>
                        <small class="form-help">TikTok ou YouTube uniquement</small>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Message (optionnel)</label>
                        <textarea name="message" class="form-input" rows="3" 
                                  placeholder="Présentez votre vidéo..."></textarea>
                    </div>
                    
                    <div class="campaign-reminder">
                        <h4>Rappel important :</h4>
                        <p>N'oubliez pas d'inclure le tag unique <strong>${Formatters.campaignTag(campaignId)}</strong> dans la description de votre vidéo.</p>
                    </div>
                </form>
            `;
            
            const result = await window.modalManager.form(modalContent, {
                title: 'Postuler à la campagne',
                confirmText: 'Envoyer ma candidature'
            });
            
            if (result) {
                await this.submitApplication(campaignId, result);
            }
            
        } catch (error) {
            console.error('Error applying to campaign:', error);
            this.showNotification('Erreur lors de la candidature', 'error');
        }
    }
    
    async checkExistingSubmission(campaignId) {
        const user = this.user;
        if (!user) return false;
        
        const result = await window.apiManager.getSubmissions({
            campaign_id: campaignId,
            creator_id: user.id
        });
        
        return result.success && result.data && result.data.length > 0;
    }
    
    async submitApplication(campaignId, formData) {
        try {
            this.showLoading('Envoi de votre candidature...');
            
            const submissionData = {
                campaign_id: campaignId,
                video_url: formData.video_url,
                unique_tag: Formatters.campaignTag(campaignId),
                message: formData.message || null
            };
            
            const result = await window.apiManager.createSubmission(submissionData);
            
            if (result.success) {
                this.showNotification('Candidature envoyée avec succès !', 'success');
                
                // Déclencher la validation automatique
                await window.apiManager.validateSubmission(result.data.id);
                
                // Mettre à jour l'affichage
                this.updateActionButton('applied');
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Error submitting application:', error);
            this.showNotification('Erreur lors de l\'envoi de la candidature', 'error');
        } finally {
            this.hideLoading();
        }
    }
    
    manageCampaign(campaignId) {
        this.router.navigate(`/activities/campaigns/${campaignId}`);
    }
    
    updateActionButton(newState) {
        const actionsContainer = this.element.querySelector('.campaign-actions');
        if (!actionsContainer) return;
        
        if (newState === 'applied') {
            const applyButton = actionsContainer.querySelector('[data-action="apply-campaign"]');
            if (applyButton) {
                applyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Candidature envoyée
                `;
                applyButton.disabled = true;
                applyButton.classList.remove('btn-primary');
                applyButton.classList.add('btn-success');
            }
        }
    }
    
    // Méthodes utilitaires
    get element() {
        return document.querySelector(`[data-campaign-id="${this.campaign.id}"]`);
    }
    
    update(newCampaignData) {
        this.campaign = { ...this.campaign, ...newCampaignData };
        this.rerender();
    }
    
    highlight() {
        this.element?.classList.add('campaign-card-highlight');
        setTimeout(() => {
            this.element?.classList.remove('campaign-card-highlight');
        }, 2000);
    }
}

console.log('🔧 CampaignCard component loaded');
