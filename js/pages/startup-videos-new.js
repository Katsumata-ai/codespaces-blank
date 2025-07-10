// Page Videos pour Startup - Dafnck Army
class StartupVideosPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Videos - Dafnck Army';
        this.sidebar = new StartupSidebar();
        this.allVideos = [];
        this.currentFilter = 'all';
        this.cpmRate = 2.50;
    }

    async render() {
        return `
            <div class="startup-layout" data-component="StartupVideosPage">
                ${await this.sidebar.render()}
                <div class="startup-main">
                    <header class="startup-header">
                        <div class="startup-header-content">
                            <div>
                                <h1 class="startup-header-title">Videos</h1>
                                <p class="startup-header-subtitle">Gerez et traitez les videos soumises par les createurs</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 16px;">
                                <button class="btn btn-secondary" data-action="refresh-videos">
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
                    <main class="startup-content">
                        ${this.renderVideosContent()}
                    </main>
                </div>
                ${this.renderModals()}
            </div>
        `;
    }

    renderVideosContent() {
        return `
            <div class="videos-container">
                ${this.renderFilterTabs()}
                <div class="videos-list">
                    ${this.renderFilteredVideos()}
                </div>
            </div>
        `;
    }

    renderFilterTabs() {
        const filters = [
            { key: 'all', label: 'All' },
            { key: 'pending', label: 'Pending' },
            { key: 'validated', label: 'Validated' },
            { key: 'rejected', label: 'Rejected' }
        ];

        return `
            <div class="filter-tabs">
                ${filters.map(filter => `
                    <button class="filter-tab ${this.currentFilter === filter.key ? 'active' : ''}"
                            data-action="set-filter"
                            data-filter="${filter.key}">
                        ${filter.label}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderFilteredVideos() {
        const filteredVideos = this.getFilteredVideos();

        if (filteredVideos.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">🎬</div>
                    <h3>Aucune video ${this.getFilterLabel()}</h3>
                    <p>Les videos apparaitront ici selon le filtre selectionne</p>
                </div>
            `;
        }

        return filteredVideos.map(video => this.renderVideoCard(video)).join('');
    }

    getFilteredVideos() {
        switch (this.currentFilter) {
            case 'pending':
                return this.allVideos.filter(v => v.status === 'pending');
            case 'validated':
                return this.allVideos.filter(v => v.status === 'approved');
            case 'rejected':
                return this.allVideos.filter(v => v.status === 'rejected');
            default:
                return this.allVideos;
        }
    }

    getFilterLabel() {
        switch (this.currentFilter) {
            case 'pending': return 'en attente';
            case 'validated': return 'validee';
            case 'rejected': return 'rejetee';
            default: return '';
        }
    }

    getPlatformIcon(platform) {
        switch (platform.toLowerCase()) {
            case 'youtube':
                return `
                    <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                `;
            case 'tiktok':
                return `
                    <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                `;
            case 'instagram':
                return `
                    <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                `;
            default:
                return `
                    <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                `;
        }
    }



    renderVideoCard(video) {
        const calculatedAmount = this.calculateCPMAmount(video.views);

        return `
            <div class="video-card video-card-${video.status}" data-video-id="${video.id}">
                <!-- Header -->
                <div class="video-card-header">
                    <div class="video-info-left">
                        <h3 class="video-title">${video.title || 'Titre de la video'}</h3>
                        <p class="video-subtitle">${video.creatorName} / ${this.formatDate(video.submittedAt)}</p>
                    </div>
                    <div class="video-actions-right">
                        ${this.renderVideoActions(video, calculatedAmount)}
                    </div>
                </div>

                <!-- Body -->
                <div class="video-card-body">
                    <div class="video-thumbnail-section">
                        <div class="video-thumbnail-container" data-action="view-video" data-video-url="${video.url}">
                            ${this.getPlatformIcon(video.platform)}
                        </div>
                    </div>
                    <div class="video-metrics-section">
                        <div class="metrics-grid">
                            <div class="metric-item">
                                <span class="metric-label">View</span>
                                <span class="metric-value">${this.formatNumber(video.views)}</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-label">Like</span>
                                <span class="metric-value">${this.formatNumber(video.likes)}</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-label">Comment</span>
                                <span class="metric-value">${this.formatNumber(video.comments)}</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-label">Payout</span>
                                <span class="metric-value">${calculatedAmount}€</span>
                                <span class="metric-calc">${this.formatNumber(video.views)} × ${this.cpmRate}€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderVideoActions(video, calculatedAmount) {
        switch (video.status) {
            case 'pending':
                return `
                    <button class="btn btn-reject" data-action="reject-video" data-video-id="${video.id}">
                        Rejeter
                    </button>
                    <button class="btn btn-validate" data-action="validate-video" data-video-id="${video.id}" data-amount="${calculatedAmount}">
                        Valider
                    </button>
                `;
            case 'approved':
                return `
                    <div class="status-badge status-validated">
                        Validée
                    </div>
                `;
            case 'rejected':
                return `
                    <div class="status-badge status-rejected">
                        Rejetée
                        <button class="rejection-info-btn" data-action="show-rejection-reason" data-video-id="${video.id}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="16" x2="12" y2="12"/>
                                <line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                        </button>
                    </div>
                `;
            default:
                return '';
        }
    }

    renderModals() {
        return `
            <div id="validateModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Valider la video</h3>
                        <button class="modal-close" data-action="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="validation-details">
                            <div class="detail-row">
                                <span class="detail-label">Createur :</span>
                                <span class="detail-value" id="validate-creator"></span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Vues :</span>
                                <span class="detail-value" id="validate-views"></span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">CPM :</span>
                                <span class="detail-value">${this.cpmRate}€</span>
                            </div>
                            <div class="detail-row highlight">
                                <span class="detail-label">Montant a payer :</span>
                                <span class="detail-value" id="validate-amount"></span>
                            </div>
                        </div>
                        <p class="validation-note">
                            En validant cette video, le paiement sera automatiquement traite et envoye au createur.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-action="close-modal">Annuler</button>
                        <button class="btn btn-success" data-action="confirm-validation">Confirmer le paiement</button>
                    </div>
                </div>
            </div>
            <div id="rejectModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Rejeter la video</h3>
                        <button class="modal-close" data-action="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="rejectionReason">Raison du refus *</label>
                            <textarea id="rejectionReason" placeholder="Expliquez pourquoi cette video ne respecte pas les criteres de la campagne..." required></textarea>
                            <div class="form-error" id="rejectionError"></div>
                        </div>
                        <p class="rejection-note">
                            Le createur recevra ce commentaire pour comprendre les raisons du refus.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-action="close-modal">Annuler</button>
                        <button class="btn btn-danger" data-action="confirm-rejection">Rejeter la video</button>
                    </div>
                </div>
            </div>
        `;
    }

    calculateCPMAmount(views) {
        return ((views / 1000) * this.cpmRate).toFixed(2);
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('fr-FR');
    }

    async init() {
        console.log('StartupVideosPage init called');
        await this.sidebar.init();
        await this.loadVideosData();
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                const videosContainer = e.target.closest('[data-component="StartupVideosPage"]');
                if (videosContainer) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleAction(action.dataset.action, action);
                }
            }
        });
    }

    async loadVideosData() {
        try {
            this.allVideos = [
                // Videos en attente
                {
                    id: 1,
                    title: 'Video TikTok produit tech',
                    creatorName: 'Sarah Martinez',
                    submittedAt: new Date('2024-01-20'),
                    views: 15200,
                    likes: 890,
                    comments: 156,
                    url: 'https://tiktok.com/@sarahm_creator/video/7321456789',
                    platform: 'TikTok',
                    status: 'pending'
                },
                {
                    id: 2,
                    title: 'Reel Instagram lifestyle',
                    creatorName: 'Alex Thompson',
                    submittedAt: new Date('2024-01-19'),
                    views: 8750,
                    likes: 445,
                    comments: 89,
                    url: 'https://instagram.com/reel/CzX8mNvP2Kl/',
                    platform: 'Instagram',
                    status: 'pending'
                },
                {
                    id: 3,
                    title: 'YouTube Short review',
                    creatorName: 'Emma Wilson',
                    submittedAt: new Date('2024-01-18'),
                    views: 23400,
                    likes: 1250,
                    comments: 234,
                    url: 'https://youtube.com/shorts/dQw4w9WgXcQ',
                    platform: 'YouTube',
                    status: 'pending'
                },

                // Videos validees
                {
                    id: 5,
                    title: 'TikTok viral marketing',
                    creatorName: 'Maya Chen',
                    submittedAt: new Date('2024-01-14'),
                    views: 45600,
                    likes: 2100,
                    comments: 387,
                    url: 'https://tiktok.com/@mayachen_/video/7318765432',
                    platform: 'TikTok',
                    status: 'approved',
                    paidAmount: '114.00'
                },
                {
                    id: 6,
                    title: 'Instagram brand showcase',
                    creatorName: 'David Rodriguez',
                    submittedAt: new Date('2024-01-13'),
                    views: 18900,
                    likes: 890,
                    comments: 156,
                    url: 'https://instagram.com/reel/CzW7mNvP1Kj/',
                    platform: 'Instagram',
                    status: 'approved',
                    paidAmount: '47.25'
                },
                {
                    id: 9,
                    title: 'Instagram lifestyle content',
                    creatorName: 'Zoe Anderson',
                    submittedAt: new Date('2024-01-10'),
                    views: 34200,
                    likes: 1890,
                    comments: 298,
                    url: 'https://instagram.com/reel/CzV6lMwO2Ki/',
                    platform: 'Instagram',
                    status: 'approved',
                    paidAmount: '85.50'
                },

                // Videos rejetees
                {
                    id: 7,
                    title: 'YouTube product review',
                    creatorName: 'Sophie Laurent',
                    submittedAt: new Date('2024-01-12'),
                    views: 7200,
                    likes: 234,
                    comments: 45,
                    url: 'https://youtube.com/shorts/aBc123XyZ89',
                    platform: 'YouTube',
                    status: 'rejected',
                    rejectionReason: 'La video ne met pas suffisamment en avant le produit selon les guidelines de la campagne'
                },
                {
                    id: 8,
                    title: 'TikTok brand mention',
                    creatorName: 'James Miller',
                    submittedAt: new Date('2024-01-11'),
                    views: 12400,
                    likes: 567,
                    comments: 89,
                    url: 'https://tiktok.com/@jamesmiller/video/7317654321',
                    platform: 'TikTok',
                    status: 'rejected',
                    rejectionReason: 'Qualite audio insuffisante et message marketing peu clair'
                }
            ];

            console.log('Videos data loaded:', this.allVideos.length, 'total videos');

            // Mettre a jour l'affichage une fois les donnees chargees
            setTimeout(() => {
                this.updateVideoDisplay();
            }, 100);
        } catch (error) {
            console.error('Error loading videos data:', error);
        }
    }

    handleAction(action, element) {
        console.log('Action triggered:', action);
        switch (action) {
            case 'refresh-videos':
                this.loadVideosData();
                setTimeout(() => {
                    this.updateVideoDisplay();
                }, 100);
                this.showNotification('Videos actualisees', 'success');
                break;
            case 'set-filter':
                const filter = element.dataset.filter;
                this.setFilter(filter);
                break;
            case 'view-video':
                const videoUrl = element.dataset.videoUrl;
                this.viewVideo(videoUrl);
                break;
            case 'validate-video':
                const videoId = element.dataset.videoId;
                const amount = element.dataset.amount;
                this.showValidationModal(videoId, amount);
                break;
            case 'reject-video':
                const rejectVideoId = element.dataset.videoId;
                this.showRejectionModal(rejectVideoId);
                break;
            case 'show-rejection-reason':
                const rejectedVideoId = element.dataset.videoId;
                this.showRejectionReasonModal(rejectedVideoId);
                break;
            case 'confirm-validation':
                this.confirmValidation();
                break;
            case 'confirm-rejection':
                this.confirmRejection();
                break;
            case 'close-modal':
                this.closeModal();
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.updateVideoDisplay();
    }

    viewVideo(videoUrl) {
        window.open(videoUrl, '_blank');
    }

    showRejectionReasonModal(videoId) {
        const video = this.allVideos.find(v => v.id == videoId);
        if (!video || !video.rejectionReason) return;

        // Créer et afficher le modal de raison de rejet
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Raison du rejet</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Video :</strong> ${video.title}</p>
                    <p><strong>Créateur :</strong> ${video.creatorName}</p>
                    <hr style="margin: 16px 0;">
                    <p><strong>Commentaire :</strong></p>
                    <p style="background: #F3F4F6; padding: 12px; border-radius: 6px; margin: 8px 0;">${video.rejectionReason}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Fermer</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showValidationModal(videoId, amount) {
        const video = this.allVideos.find(v => v.id == videoId);
        if (!video) return;

        document.getElementById('validate-creator').textContent = video.creatorName;
        document.getElementById('validate-views').textContent = this.formatNumber(video.views);
        document.getElementById('validate-amount').textContent = amount + '€';

        this.currentVideoId = videoId;
        this.currentAmount = amount;

        document.getElementById('validateModal').style.display = 'flex';
    }

    showRejectionModal(videoId) {
        this.currentVideoId = videoId;
        document.getElementById('rejectionReason').value = '';
        document.getElementById('rejectionError').textContent = '';
        document.getElementById('rejectModal').style.display = 'flex';
    }

    async confirmValidation() {
        try {
            const video = this.allVideos.find(v => v.id == this.currentVideoId);
            if (!video) return;

            video.status = 'approved';
            video.paidAmount = this.currentAmount;

            this.closeModal();

            // Mettre a jour l'affichage sans rerender complet
            this.updateVideoDisplay();

            this.showNotification('Video validee - Paiement de ' + this.currentAmount + '€ traite', 'success');
        } catch (error) {
            console.error('Error validating video:', error);
            this.showNotification('Erreur lors de la validation', 'error');
        }
    }

    async confirmRejection() {
        const reason = document.getElementById('rejectionReason').value.trim();

        if (!reason) {
            document.getElementById('rejectionError').textContent = 'Veuillez expliquer la raison du refus';
            return;
        }

        try {
            const video = this.allVideos.find(v => v.id == this.currentVideoId);
            if (!video) return;

            video.status = 'rejected';
            video.rejectionReason = reason;

            this.closeModal();

            // Mettre a jour l'affichage sans rerender complet
            this.updateVideoDisplay();

            this.showNotification('Video rejetee avec commentaire', 'success');
        } catch (error) {
            console.error('Error rejecting video:', error);
            this.showNotification('Erreur lors du rejet', 'error');
        }
    }

    closeModal() {
        document.getElementById('validateModal').style.display = 'none';
        document.getElementById('rejectModal').style.display = 'none';
        this.currentVideoId = null;
        this.currentAmount = null;
    }

    updateVideoDisplay() {
        console.log('updateVideoDisplay called');

        // Mettre a jour les onglets de filtre
        const filterTabs = document.querySelector('.filter-tabs');
        if (filterTabs) {
            filterTabs.innerHTML = this.renderFilterTabs().replace('<div class="filter-tabs">', '').replace('</div>', '');
        }

        // Mettre a jour la liste des videos
        const videosList = document.querySelector('.videos-list');
        if (videosList) {
            videosList.innerHTML = this.renderFilteredVideos();
            console.log('Updated videos list');
        }

        console.log('updateVideoDisplay completed');
    }
}

console.log('StartupVideosPage class defined');
