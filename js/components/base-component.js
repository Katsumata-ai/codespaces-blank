// Composant de base pour tous les composants Dafnck Army
class BaseComponent {
    constructor(params = {}) {
        this.params = params;
        this.state = {};
        this.eventListeners = [];
        this.supabase = window.supabaseClient;
        this.appState = window.appState;
        this.auth = window.authManager;
        this.router = window.router;
        this.title = 'Dafnck Army';
    }
    
    // Gestion d'état local du composant
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.rerender();
    }
    
    getState(key) {
        return key ? this.state[key] : this.state;
    }
    
    // Gestion des event listeners avec cleanup automatique
    addEventListener(element, event, handler, options = {}) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (!element) {
            console.warn('Element not found for event listener:', element);
            return;
        }
        
        element.addEventListener(event, handler, options);
        this.eventListeners.push({ element, event, handler, options });
    }
    
    // Cleanup automatique des event listeners
    destroy() {
        this.eventListeners.forEach(({ element, event, handler, options }) => {
            element.removeEventListener(event, handler, options);
        });
        this.eventListeners = [];
        
        // Hook pour cleanup personnalisé
        if (this.onDestroy) {
            this.onDestroy();
        }
    }
    
    // Re-render du composant
    async rerender() {
        const container = document.querySelector(`[data-component="${this.constructor.name}"]`);
        if (container) {
            const html = await this.render();
            container.innerHTML = html;
            await this.init();
        }
    }
    
    // Méthodes à implémenter par les composants enfants
    async render() {
        throw new Error(`render() method must be implemented in ${this.constructor.name}`);
    }
    
    async init() {
        // Hook d'initialisation optionnel
    }
    
    // Utilitaires pour les composants
    showLoading(text = 'Chargement...') {
        if (window.loadingManager) {
            window.loadingManager.show(text);
        }
    }

    hideLoading() {
        if (window.loadingManager) {
            window.loadingManager.hide();
        }
    }
    
    showError(message, container = null) {
        const target = container || document.querySelector(`[data-component="${this.constructor.name}"]`);
        if (target) {
            target.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">⚠️</div>
                    <p class="error-message">${message}</p>
                    <button class="btn btn-secondary" onclick="window.location.reload()">
                        Réessayer
                    </button>
                </div>
            `;
        }
    }
    
    // Helpers pour les appels API
    async apiCall(fn, errorMessage = 'Une erreur est survenue') {
        try {
            this.appState.setState({ loading: true });
            const result = await fn();
            return result;
        } catch (error) {
            console.error('API call error:', error);
            this.showNotification(errorMessage, 'error');
            throw error;
        } finally {
            this.appState.setState({ loading: false });
        }
    }
    
    // Système de notifications
    showNotification(message, type = 'info', duration = 5000) {
        const notification = new Notification(message, type, duration);
        notification.show();
    }
    
    // Validation de formulaires
    validateForm(formElement, rules) {
        const errors = {};
        let isValid = true;
        
        Object.keys(rules).forEach(fieldName => {
            const field = formElement.querySelector(`[name="${fieldName}"]`);
            const value = field ? field.value.trim() : '';
            const fieldRules = rules[fieldName];
            
            for (const rule of fieldRules) {
                if (!rule.validator(value)) {
                    errors[fieldName] = rule.message;
                    isValid = false;
                    this.showFieldError(field, rule.message);
                    break;
                } else {
                    this.clearFieldError(field);
                }
            }
        });
        
        return { isValid, errors };
    }
    
    showFieldError(field, message) {
        if (!field) return;
        
        field.classList.add('error');
        
        // Supprimer l'ancien message d'erreur
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Ajouter le nouveau message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        if (!field) return;
        
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Helpers pour les données utilisateur
    get user() {
        return this.appState.getState('user');
    }
    
    get userRole() {
        return this.appState.getState('userRole');
    }
    
    get isAuthenticated() {
        return this.appState.getState('isAuthenticated');
    }
    
    // Helper pour formater les données
    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }
    
    formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
    
    formatNumber(number) {
        return new Intl.NumberFormat('fr-FR').format(number);
    }
    
    // Helper pour les classes CSS conditionnelles
    classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    
    // Helper pour échapper le HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Helper pour debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

console.log('🔧 Base Component loaded');
