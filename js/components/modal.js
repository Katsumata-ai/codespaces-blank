// Composant Modal pour Dafnck Army
class Modal extends BaseComponent {
    constructor(options = {}) {
        super();
        this.options = {
            title: options.title || '',
            content: options.content || '',
            size: options.size || 'medium', // small, medium, large, fullscreen
            closable: options.closable !== false,
            backdrop: options.backdrop !== false,
            keyboard: options.keyboard !== false,
            onClose: options.onClose || null,
            onConfirm: options.onConfirm || null,
            confirmText: options.confirmText || 'Confirmer',
            cancelText: options.cancelText || 'Annuler',
            type: options.type || 'default' // default, confirm, alert
        };
        
        this.isOpen = false;
        this.element = null;
    }
    
    render() {
        return `
            <div class="modal-overlay ${this.options.backdrop ? 'modal-backdrop' : ''}" data-component="Modal">
                <div class="modal-container modal-${this.options.size}">
                    <div class="modal-content">
                        ${this.renderHeader()}
                        ${this.renderBody()}
                        ${this.renderFooter()}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderHeader() {
        if (!this.options.title && !this.options.closable) {
            return '';
        }
        
        return `
            <div class="modal-header">
                ${this.options.title ? `<h3 class="modal-title">${this.options.title}</h3>` : ''}
                ${this.options.closable ? `
                    <button class="modal-close" data-action="close" aria-label="Fermer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                ` : ''}
            </div>
        `;
    }
    
    renderBody() {
        return `
            <div class="modal-body">
                ${this.options.content}
            </div>
        `;
    }
    
    renderFooter() {
        if (this.options.type === 'default') {
            return '';
        }
        
        return `
            <div class="modal-footer">
                ${this.options.type === 'confirm' ? `
                    <button class="btn btn-ghost" data-action="cancel">
                        ${this.options.cancelText}
                    </button>
                    <button class="btn btn-primary" data-action="confirm">
                        ${this.options.confirmText}
                    </button>
                ` : `
                    <button class="btn btn-primary" data-action="close">
                        OK
                    </button>
                `}
            </div>
        `;
    }
    
    async init() {
        // Event listeners
        this.addEventListener(this.element, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                e.preventDefault();
                this.handleAction(action.dataset.action);
            }
            
            // Fermer si on clique sur le backdrop
            if (e.target === this.element && this.options.backdrop) {
                this.close();
            }
        });
        
        // Écouter les touches du clavier
        if (this.options.keyboard) {
            this.addEventListener(document, 'keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }
        
        // Animation d'ouverture
        requestAnimationFrame(() => {
            this.element.classList.add('modal-open');
        });
    }
    
    handleAction(action) {
        switch (action) {
            case 'close':
            case 'cancel':
                this.close();
                break;
            case 'confirm':
                this.confirm();
                break;
        }
    }
    
    open() {
        if (this.isOpen) return;

        try {
            // Créer l'élément modal
            this.element = document.createElement('div');
            const html = this.render();
            this.element.innerHTML = html;
            this.element = this.element.firstElementChild;

            // Vérifier que l'élément a été créé correctement
            if (!this.element) {
                console.error('Failed to create modal element from HTML:', html);
                return this;
            }

            // Ajouter au DOM
            document.body.appendChild(this.element);

            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';

            // Initialiser
            this.init();

            this.isOpen = true;
        } catch (error) {
            console.error('Error opening modal:', error);
        }

        return this;
    }
    
    close() {
        if (!this.isOpen) return;
        
        // Animation de fermeture
        this.element.classList.add('modal-closing');
        
        setTimeout(() => {
            // Supprimer du DOM
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            
            // Restaurer le scroll du body
            document.body.style.overflow = '';
            
            // Callback de fermeture
            if (this.options.onClose) {
                this.options.onClose();
            }
            
            // Cleanup
            this.destroy();
            
            this.isOpen = false;
        }, 300);
        
        return this;
    }
    
    confirm() {
        if (this.options.onConfirm) {
            const result = this.options.onConfirm();
            
            // Si la fonction retourne false, ne pas fermer
            if (result !== false) {
                this.close();
            }
        } else {
            this.close();
        }
    }
    
    updateContent(content) {
        const body = this.element?.querySelector('.modal-body');
        if (body) {
            body.innerHTML = content;
        }
        return this;
    }
    
    updateTitle(title) {
        const titleElement = this.element?.querySelector('.modal-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
        return this;
    }
}

// Gestionnaire global de modals
class ModalManager {
    constructor() {
        this.activeModals = [];
    }
    
    // Modal simple
    show(content, options = {}) {
        const modal = new Modal({
            content,
            ...options
        });
        
        modal.open();
        this.activeModals.push(modal);
        
        return modal;
    }
    
    // Modal de confirmation
    confirm(message, options = {}) {
        return new Promise((resolve) => {
            const modal = new Modal({
                title: options.title || 'Confirmation',
                content: `<p>${message}</p>`,
                type: 'confirm',
                confirmText: options.confirmText || 'Confirmer',
                cancelText: options.cancelText || 'Annuler',
                onConfirm: () => {
                    resolve(true);
                },
                onClose: () => {
                    resolve(false);
                },
                ...options
            });
            
            modal.open();
            this.activeModals.push(modal);
        });
    }
    
    // Modal d'alerte
    alert(message, options = {}) {
        return new Promise((resolve) => {
            const modal = new Modal({
                title: options.title || 'Information',
                content: `<p>${message}</p>`,
                type: 'alert',
                onClose: () => {
                    resolve();
                },
                ...options
            });
            
            modal.open();
            this.activeModals.push(modal);
        });
    }
    
    // Modal de formulaire
    form(formHtml, options = {}) {
        return new Promise((resolve, reject) => {
            const modal = new Modal({
                title: options.title || 'Formulaire',
                content: formHtml,
                type: 'confirm',
                confirmText: options.confirmText || 'Valider',
                cancelText: options.cancelText || 'Annuler',
                onConfirm: () => {
                    const form = modal.element.querySelector('form');
                    if (form) {
                        const formData = new FormData(form);
                        const data = Object.fromEntries(formData.entries());
                        resolve(data);
                    } else {
                        resolve({});
                    }
                },
                onClose: () => {
                    reject(new Error('Formulaire annulé'));
                },
                ...options
            });
            
            modal.open();
            this.activeModals.push(modal);
        });
    }
    
    // Fermer tous les modals
    closeAll() {
        this.activeModals.forEach(modal => {
            if (modal.isOpen) {
                modal.close();
            }
        });
        this.activeModals = [];
    }
    
    // Fermer le dernier modal
    closeLast() {
        const lastModal = this.activeModals.pop();
        if (lastModal && lastModal.isOpen) {
            lastModal.close();
        }
    }
}

// Instance globale
if (!window.modalManager) {
    window.modalManager = new ModalManager();
}

console.log('🔧 Modal component loaded');
