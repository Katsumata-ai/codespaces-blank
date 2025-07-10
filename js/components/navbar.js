// Composant NavBar pour Dafnck Army
class NavBar extends BaseComponent {
    constructor() {
        super();
        this.isMenuOpen = false;
        this.isMobile = window.innerWidth <= 768;
        
        // Écouter les changements d'état
        this.appState.subscribe('user', () => this.rerender());
        this.appState.subscribe('userRole', () => this.rerender());
        this.appState.subscribe('currentRoute', () => this.updateActiveLink());
        
        // Écouter le redimensionnement
        window.addEventListener('resize', this.debounce(() => {
            this.isMobile = window.innerWidth <= 768;
            this.rerender();
        }, 250));
    }
    
    async render() {
        const user = this.user;
        const userRole = this.userRole;
        const isAuthenticated = this.isAuthenticated;
        
        if (!isAuthenticated) {
            return this.renderPublicNav();
        }
        
        return this.renderAuthenticatedNav(user, userRole);
    }
    
    renderPublicNav() {
        return `
            <nav class="navbar navbar-public" data-component="NavBar">
                <div class="nav-container">
                    <div class="nav-brand">
                        <a href="/" class="brand-link">
                            <img src="assets/logo.svg" alt="Dafnck Army" class="nav-logo">
                            <span class="brand-text">Dafnck Army</span>
                        </a>
                    </div>
                    
                    <div class="nav-actions">
                        <a href="/auth?mode=login" class="btn btn-ghost">
                            Connexion
                        </a>
                        <a href="/auth?mode=signup" class="btn btn-primary">
                            Inscription
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }
    
    renderAuthenticatedNav(user, userRole) {
        const navItems = this.getNavItems(userRole);
        
        return `
            <nav class="navbar navbar-authenticated" data-component="NavBar">
                <div class="nav-container">
                    <!-- Brand -->
                    <div class="nav-brand">
                        <a href="${this.getDefaultRoute(userRole)}" class="brand-link">
                            <img src="assets/logo.svg" alt="Dafnck Army" class="nav-logo">
                            <span class="brand-text">Dafnck Army</span>
                        </a>
                    </div>
                    
                    <!-- Navigation principale -->
                    <div class="nav-main ${this.isMobile ? 'nav-mobile' : 'nav-desktop'}">
                        ${this.isMobile ? this.renderMobileToggle() : ''}
                        
                        <div class="nav-menu ${this.isMenuOpen ? 'nav-menu-open' : ''}">
                            ${navItems.map(item => this.renderNavItem(item)).join('')}
                        </div>
                    </div>
                    
                    <!-- Actions utilisateur -->
                    <div class="nav-user">
                        <div class="user-info">
                            <span class="user-role">${Formatters.role(userRole)}</span>
                            <span class="user-email">${Formatters.username(user.email)}</span>
                        </div>
                        
                        <div class="user-menu">
                            <button class="user-menu-trigger" data-action="toggle-user-menu">
                                <div class="user-avatar">
                                    <img src="${user.avatar_url || 'assets/default-avatar.svg'}" alt="Avatar">
                                </div>
                                <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 10l5 5 5-5z"/>
                                </svg>
                            </button>
                            
                            <div class="user-dropdown" data-dropdown="user-menu">
                                <a href="/profile" class="dropdown-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    Profil
                                </a>
                                <a href="/budget" class="dropdown-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                    </svg>
                                    Budget
                                </a>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" data-action="logout">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                    </svg>
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
    
    renderMobileToggle() {
        return `
            <button class="mobile-menu-toggle" data-action="toggle-mobile-menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        `;
    }
    
    renderNavItem(item) {
        const currentRoute = this.appState.getState('currentRoute');
        const isActive = currentRoute === item.path || currentRoute.startsWith(item.path + '/');
        
        return `
            <a href="${item.path}" class="nav-item ${isActive ? 'nav-item-active' : ''}" data-nav-item="${item.path}">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    ${this.getIconPath(item.icon)}
                </svg>
                <span class="nav-label">${item.label}</span>
                ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </a>
        `;
    }
    
    getNavItems(userRole) {
        const baseItems = [
            { path: '/explorer', label: 'Explorer', icon: 'search' }
        ];
        
        if (userRole === 'startup') {
            return [
                ...baseItems,
                { path: '/create', label: 'Créer', icon: 'plus' },
                { path: '/activities', label: 'Mes Campagnes', icon: 'activity' }
            ];
        } else {
            return [
                ...baseItems,
                { path: '/activities', label: 'Mes Missions', icon: 'target' }
            ];
        }
    }
    
    getDefaultRoute(userRole) {
        return '/explorer'; // Tous les utilisateurs vont sur explorer
    }
    
    getIconPath(iconName) {
        const icons = {
            search: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
            plus: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
            activity: '<path d="M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-3V5a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2h2v2h3zm0-6V3h2v2H9z"/>',
            target: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>'
        };
        
        return icons[iconName] || icons.search;
    }
    
    async init() {
        // Event listeners pour la navigation
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                e.preventDefault();
                this.handleAction(action.dataset.action);
            }
            
            // Fermer les dropdowns si on clique ailleurs
            if (!e.target.closest('.user-menu')) {
                this.closeDropdowns();
            }
        });
        
        // Fermer le menu mobile si on clique sur un lien
        this.addEventListener(document, 'click', (e) => {
            const navItem = e.target.closest('[data-nav-item]');
            if (navItem && this.isMobile) {
                this.isMenuOpen = false;
                this.updateMobileMenu();
            }
        });
        
        // Écouter les touches d'échappement
        this.addEventListener(document, 'keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdowns();
                if (this.isMobile && this.isMenuOpen) {
                    this.isMenuOpen = false;
                    this.updateMobileMenu();
                }
            }
        });
    }
    
    handleAction(action) {
        switch (action) {
            case 'toggle-mobile-menu':
                this.toggleMobileMenu();
                break;
            case 'toggle-user-menu':
                this.toggleUserMenu();
                break;
            case 'logout':
                this.handleLogout();
                break;
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.updateMobileMenu();
    }
    
    updateMobileMenu() {
        const menu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (menu) {
            menu.classList.toggle('nav-menu-open', this.isMenuOpen);
        }
        
        if (toggle) {
            toggle.classList.toggle('menu-open', this.isMenuOpen);
        }
        
        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }
    
    toggleUserMenu() {
        const dropdown = document.querySelector('[data-dropdown="user-menu"]');
        if (dropdown) {
            dropdown.classList.toggle('dropdown-open');
        }
    }
    
    closeDropdowns() {
        const dropdowns = document.querySelectorAll('.user-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('dropdown-open');
        });
    }
    
    async handleLogout() {
        try {
            const result = await this.auth.signOut();
            if (result.success) {
                this.showNotification('Déconnexion réussie', 'success');
                this.router.navigate('/');
            } else {
                this.showNotification('Erreur lors de la déconnexion', 'error');
            }
        } catch (error) {
            console.error('Logout error:', error);
            this.showNotification('Erreur lors de la déconnexion', 'error');
        }
    }
    
    updateActiveLink() {
        const currentRoute = this.appState.getState('currentRoute');
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const path = item.dataset.navItem;
            const isActive = currentRoute === path || currentRoute.startsWith(path + '/');
            item.classList.toggle('nav-item-active', isActive);
        });
    }
    
    onDestroy() {
        // Restaurer le scroll du body
        document.body.style.overflow = '';
    }
}

console.log('🔧 NavBar component loaded');
