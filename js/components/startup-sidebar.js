// Startup Sidebar Component - Dafnck Army
// Military-inspired navigation with blue/white theme

class StartupSidebar extends BaseComponent {
    constructor(params = {}) {
        super(params);
        this.currentPath = window.location.pathname;
        this.userCampaigns = this.getUserCampaignsCount();
        // Ensure we have access to global managers
        this.auth = window.authManager;
        this.router = window.router;
    }

    async render() {
        return `
            <div class="startup-sidebar" data-component="StartupSidebar">
                <!-- Sidebar Header -->
                ${this.renderSidebarHeader()}
                
                <!-- Navigation Menu -->
                ${this.renderNavigation()}
                
                <!-- Budget Overview -->
                ${this.renderBudgetOverview()}
                
                <!-- User Profile -->
                ${this.renderUserProfile()}
            </div>
        `;
    }

    renderSidebarHeader() {
        return `
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    <div class="sidebar-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                            <path d="M12 8L12.5 10.5L15 11L12.5 11.5L12 14L11.5 11.5L9 11L11.5 10.5L12 8Z"/>
                        </svg>
                    </div>
                    <div>
                        <h1 class="sidebar-brand-text">Dafnck Army</h1>
                        <p class="sidebar-role">Startup</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderNavigation() {
        const menuItems = [
            { 
                path: '/explorer', 
                label: 'Explorer', 
                icon: this.getSearchIcon(),
                description: 'Vue d\'ensemble des campagnes'
            },
            { 
                path: '/analytics', 
                label: 'Analytics', 
                icon: this.getBarChartIcon(),
                description: 'Métriques et performances',
                disabled: this.userCampaigns === 0
            },
            {
                path: '/videos',
                label: 'Videos',
                icon: this.getPlayIcon(),
                description: 'Gestion des soumissions',
                disabled: false
            }
        ];

        return `
            <nav class="sidebar-nav">
                <ul class="sidebar-nav-list">
                    ${menuItems.map(item => this.renderNavItem(item)).join('')}
                </ul>
            </nav>
        `;
    }

    renderNavItem(item) {
        const isActive = this.currentPath === item.path || this.currentPath.startsWith(item.path + '/');
        const isDisabled = item.disabled;
        
        return `
            <li class="sidebar-nav-item">
                <a href="${item.path}" 
                   class="sidebar-nav-link ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}"
                   data-nav-item="${item.path}"
                   ${isDisabled ? 'data-disabled="true"' : ''}>
                    <div class="sidebar-nav-icon">
                        ${item.icon}
                    </div>
                    <div class="sidebar-nav-content">
                        <span class="sidebar-nav-label">${item.label}</span>
                        ${isDisabled ? '<span class="sidebar-nav-badge">Bientôt</span>' : ''}
                    </div>
                </a>
            </li>
        `;
    }

    renderBudgetOverview() {
        const budget = this.getBudgetInfo();
        
        return `
            <div class="sidebar-footer">
                <div class="budget-overview-card">
                    <div class="budget-header">
                        <div class="budget-icon">
                            ${this.getWalletIcon()}
                        </div>
                        <div class="budget-info">
                            <span class="budget-label">Budget Total</span>
                            <span class="budget-amount">${budget.total}€</span>
                        </div>
                    </div>
                    <div class="budget-progress">
                        <div class="budget-progress-bar">
                            <div class="budget-progress-fill" style="width: ${budget.percentage}%"></div>
                        </div>
                        <div class="budget-progress-text">
                            <span>${budget.used}€ utilisé</span>
                            <span>${budget.remaining}€ restant</span>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm budget-manage-btn" data-action="manage-budget">
                        Gérer le budget
                    </button>
                </div>
            </div>
        `;
    }

    renderUserProfile() {
        // Use global authManager directly to avoid initialization issues
        const authManager = window.authManager;
        const user = authManager && authManager.getCurrentUser ? authManager.getCurrentUser() : { email: 'utilisateur@example.com' };
        
        return `
            <div class="user-profile-section">
                <div class="user-profile-card">
                    <div class="user-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <div class="user-info">
                        <span class="user-name">${user?.email?.split('@')[0] || 'Utilisateur'}</span>
                        <span class="user-role">Startup</span>
                    </div>
                    <button class="user-menu-btn" data-action="toggle-user-menu">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    // Icon helpers
    getSearchIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
            </svg>
        `;
    }

    getBarChartIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
        `;
    }

    getPlayIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5,3 19,12 5,21"/>
            </svg>
        `;
    }

    getWalletIcon() {
        return `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
            </svg>
        `;
    }

    // Data helpers
    getUserCampaignsCount() {
        try {
            const campaigns = JSON.parse(localStorage.getItem('user_campaigns') || '[]');
            return campaigns.length;
        } catch {
            return 0;
        }
    }

    getBudgetInfo() {
        try {
            const budget = JSON.parse(localStorage.getItem('user_budget') || '{"total": 0, "used": 0}');
            return {
                total: budget.total || 0,
                used: budget.used || 0,
                remaining: (budget.total || 0) - (budget.used || 0),
                percentage: budget.total > 0 ? Math.round(((budget.used || 0) / budget.total) * 100) : 0
            };
        } catch {
            return {
                total: 0,
                used: 0,
                remaining: 0,
                percentage: 0
            };
        }
    }

    async init() {
        // Ensure we have access to router
        if (!this.router && window.router) {
            this.router = window.router;
        }

        // Handle navigation clicks
        this.addEventListener(document, 'click', (e) => {
            const navItem = e.target.closest('[data-nav-item]');
            if (navItem && !navItem.hasAttribute('data-disabled')) {
                e.preventDefault();
                const path = navItem.dataset.navItem;
                if (this.router) {
                    this.router.navigate(path);
                }
            }
        });

        // Handle action buttons
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                e.preventDefault();
                this.handleAction(action.dataset.action);
            }
        });
    }

    handleAction(action) {
        switch (action) {
            case 'manage-budget':
                if (this.router) {
                    this.router.navigate('/budget');
                }
                break;
            case 'toggle-user-menu':
                this.toggleUserMenu();
                break;
            default:
                // Ignorer les actions qui ne sont pas gérées par la sidebar
                // (elles peuvent être gérées par d'autres composants)
                if (!['copy-invite-link', 'view-creator', 'refresh-data'].includes(action)) {
                    console.log('Action not implemented in sidebar:', action);
                }
        }
    }

    toggleUserMenu() {
        // TODO: Implement user menu dropdown
        if (this.showNotification) {
            this.showNotification('Menu utilisateur - À venir !', 'info');
        } else {
            console.log('Menu utilisateur - À venir !');
        }
    }
}

console.log('🔧 Startup Sidebar Component loaded');
