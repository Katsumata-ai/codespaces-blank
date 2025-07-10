// Composant Notification pour Dafnck Army
class Notification extends BaseComponent {
    constructor(message, type = 'info', duration = 5000, options = {}) {
        super();
        this.message = message;
        this.type = type; // info, success, warning, error
        this.duration = duration;
        this.options = {
            closable: options.closable !== false,
            persistent: options.persistent || false,
            position: options.position || 'top-right', // top-right, top-left, bottom-right, bottom-left
            ...options
        };
        
        this.element = null;
        this.timeoutId = null;
    }
    
    render() {
        return `
            <div class="notification notification-${this.type}" data-component="Notification">
                <div class="notification-content">
                    <div class="notification-icon">
                        ${this.getIcon()}
                    </div>
                    <div class="notification-message">
                        ${this.message}
                    </div>
                    ${this.options.closable ? `
                        <button class="notification-close" data-action="close" aria-label="Fermer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
                ${!this.options.persistent && this.duration > 0 ? `
                    <div class="notification-progress">
                        <div class="notification-progress-bar" style="animation-duration: ${this.duration}ms"></div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    getIcon() {
        const icons = {
            info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>`,
            success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>`,
            warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>`,
            error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>`
        };
        
        return icons[this.type] || icons.info;
    }
    
    async init() {
        // Event listeners
        this.addEventListener(this.element, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action && action.dataset.action === 'close') {
                this.close();
            }
        });
        
        // Auto-fermeture
        if (!this.options.persistent && this.duration > 0) {
            this.timeoutId = setTimeout(() => {
                this.close();
            }, this.duration);
        }
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            this.element.classList.add('notification-show');
        });
    }
    
    show() {
        try {
            // Créer l'élément
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.render();
            this.element = tempDiv.firstElementChild;

            if (!this.element) {
                console.error('Failed to create notification element');
                return this;
            }

            // Ajouter au container
            const container = this.getContainer();
            if (container && this.element) {
                container.appendChild(this.element);

                // Initialiser
                this.init();
            }
        } catch (error) {
            console.error('Error showing notification:', error);
        }

        return this;
    }
    
    close() {
        if (!this.element) return;
        
        // Annuler le timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        // Animation de sortie
        this.element.classList.add('notification-hide');
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.destroy();
        }, 300);
        
        return this;
    }
    
    getContainer() {
        const containerId = `notification-container-${this.options.position}`;
        let container = document.getElementById(containerId);
        
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.className = `notification-container notification-container-${this.options.position}`;
            document.body.appendChild(container);
        }
        
        return container;
    }
    
    update(message, type) {
        if (this.element) {
            this.message = message;
            if (type) this.type = type;
            
            const messageElement = this.element.querySelector('.notification-message');
            const iconElement = this.element.querySelector('.notification-icon');
            
            if (messageElement) {
                messageElement.innerHTML = this.message;
            }
            
            if (iconElement && type) {
                iconElement.innerHTML = this.getIcon();
                this.element.className = `notification notification-${this.type} notification-show`;
            }
        }
        
        return this;
    }
}

// Gestionnaire global de notifications
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
    }
    
    show(message, type = 'info', duration = 5000, options = {}) {
        // Limiter le nombre de notifications
        if (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            if (oldest) {
                oldest.close();
            }
        }
        
        const notification = new Notification(message, type, duration, options);
        notification.show();
        
        this.notifications.push(notification);
        
        // Supprimer de la liste quand fermée
        const originalClose = notification.close.bind(notification);
        notification.close = () => {
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
            return originalClose();
        };
        
        return notification;
    }
    
    success(message, duration = 4000, options = {}) {
        return this.show(message, 'success', duration, options);
    }
    
    error(message, duration = 6000, options = {}) {
        return this.show(message, 'error', duration, options);
    }
    
    warning(message, duration = 5000, options = {}) {
        return this.show(message, 'warning', duration, options);
    }
    
    info(message, duration = 4000, options = {}) {
        return this.show(message, 'info', duration, options);
    }
    
    // Notification persistante
    persistent(message, type = 'info', options = {}) {
        return this.show(message, type, 0, { ...options, persistent: true });
    }
    
    // Fermer toutes les notifications
    clear() {
        this.notifications.forEach(notification => {
            notification.close();
        });
        this.notifications = [];
    }
    
    // Fermer les notifications d'un type spécifique
    clearType(type) {
        this.notifications
            .filter(notification => notification.type === type)
            .forEach(notification => {
                notification.close();
            });
    }
}

// Instance globale
if (!window.notificationManager) {
    window.notificationManager = new NotificationManager();
}

// Raccourcis globaux
window.showNotification = (message, type, duration, options) => {
    return window.notificationManager.show(message, type, duration, options);
};

window.showSuccess = (message, duration, options) => {
    return window.notificationManager.success(message, duration, options);
};

window.showError = (message, duration, options) => {
    return window.notificationManager.error(message, duration, options);
};

window.showWarning = (message, duration, options) => {
    return window.notificationManager.warning(message, duration, options);
};

window.showInfo = (message, duration, options) => {
    return window.notificationManager.info(message, duration, options);
};

console.log('🔧 Notification component loaded');
