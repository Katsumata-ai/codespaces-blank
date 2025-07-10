// Composant Loading pour Dafnck Army
class Loading extends BaseComponent {
    constructor(options = {}) {
        super();
        this.options = {
            text: options.text || 'Chargement...',
            size: options.size || 'medium', // small, medium, large
            type: options.type || 'spinner', // spinner, dots, pulse, bars
            overlay: options.overlay !== false,
            ...options
        };
        
        this.element = null;
    }
    
    render() {
        return `
            <div class="loading-component ${this.options.overlay ? 'loading-overlay' : ''}" data-component="Loading">
                <div class="loading-content loading-${this.options.size}">
                    <div class="loading-animation loading-${this.options.type}">
                        ${this.renderAnimation()}
                    </div>
                    ${this.options.text ? `<p class="loading-text">${this.options.text}</p>` : ''}
                </div>
            </div>
        `;
    }
    
    renderAnimation() {
        switch (this.options.type) {
            case 'spinner':
                return `
                    <div class="spinner">
                        <div class="spinner-circle"></div>
                    </div>
                `;
            
            case 'dots':
                return `
                    <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                `;
            
            case 'pulse':
                return `
                    <div class="pulse">
                        <div class="pulse-circle"></div>
                    </div>
                `;
            
            case 'bars':
                return `
                    <div class="bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                `;
            
            default:
                return this.renderAnimation('spinner');
        }
    }
    
    show(container = null) {
        try {
            // Créer l'élément
            this.element = document.createElement('div');
            const html = this.render();
            this.element.innerHTML = html;
            this.element = this.element.firstElementChild;

            // Vérifier que l'élément a été créé correctement
            if (!this.element) {
                console.error('Failed to create loading element from HTML:', html);
                return this;
            }

            // Ajouter au container ou au body
            const target = container || document.body;

            // Vérifier que target est un Node valide
            if (target && typeof target.appendChild === 'function') {
                target.appendChild(this.element);

                // Animation d'entrée
                requestAnimationFrame(() => {
                    if (this.element && this.element.classList) {
                        this.element.classList.add('loading-show');
                    }
                });
            } else {
                console.warn('Invalid container for loading element:', target);
            }
        } catch (error) {
            console.error('Error showing loading component:', error);
        }

        return this;
    }
    
    hide() {
        if (!this.element) return;
        
        // Animation de sortie
        this.element.classList.add('loading-hide');
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.destroy();
        }, 300);
        
        return this;
    }
    
    updateText(text) {
        if (this.element) {
            const textElement = this.element.querySelector('.loading-text');
            if (textElement) {
                textElement.textContent = text;
            }
        }
        return this;
    }
}

// Gestionnaire global de loading
class LoadingManager {
    constructor() {
        this.activeLoadings = new Map();
        this.globalLoading = null;
    }
    
    // Afficher un loading global
    show(text = 'Chargement...', options = {}) {
        if (this.globalLoading) {
            this.globalLoading.updateText(text);
            return this.globalLoading;
        }
        
        this.globalLoading = new Loading({
            text,
            overlay: true,
            ...options
        });
        
        this.globalLoading.show();
        
        return this.globalLoading;
    }
    
    // Masquer le loading global
    hide() {
        if (this.globalLoading) {
            this.globalLoading.hide();
            this.globalLoading = null;
        }
    }
    
    // Loading pour un élément spécifique
    showFor(elementId, text = 'Chargement...', options = {}) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with id "${elementId}" not found`);
            return null;
        }
        
        // Supprimer le loading existant s'il y en a un
        this.hideFor(elementId);
        
        const loading = new Loading({
            text,
            overlay: false,
            ...options
        });
        
        loading.show(element);
        this.activeLoadings.set(elementId, loading);
        
        return loading;
    }
    
    // Masquer le loading d'un élément spécifique
    hideFor(elementId) {
        const loading = this.activeLoadings.get(elementId);
        if (loading) {
            loading.hide();
            this.activeLoadings.delete(elementId);
        }
    }
    
    // Masquer tous les loadings
    hideAll() {
        this.hide();
        this.activeLoadings.forEach(loading => loading.hide());
        this.activeLoadings.clear();
    }
    
    // Loading avec promesse
    async withLoading(promise, text = 'Chargement...', options = {}) {
        const loading = this.show(text, options);
        
        try {
            const result = await promise;
            this.hide();
            return result;
        } catch (error) {
            this.hide();
            throw error;
        }
    }
    
    // Loading pour un élément avec promesse
    async withLoadingFor(elementId, promise, text = 'Chargement...', options = {}) {
        const loading = this.showFor(elementId, text, options);
        
        try {
            const result = await promise;
            this.hideFor(elementId);
            return result;
        } catch (error) {
            this.hideFor(elementId);
            throw error;
        }
    }
}

// Composants de loading spécialisés
class ButtonLoading {
    constructor(button, text = 'Chargement...') {
        this.button = button;
        this.originalText = button.textContent;
        this.originalDisabled = button.disabled;
        this.text = text;
    }
    
    show() {
        this.button.disabled = true;
        this.button.innerHTML = `
            <span class="btn-loading">
                <span class="btn-spinner"></span>
                ${this.text}
            </span>
        `;
        this.button.classList.add('btn-loading-state');
        return this;
    }
    
    hide() {
        this.button.disabled = this.originalDisabled;
        this.button.textContent = this.originalText;
        this.button.classList.remove('btn-loading-state');
        return this;
    }
}

class TableLoading {
    constructor(table, rowCount = 5) {
        this.table = table;
        this.rowCount = rowCount;
        this.originalContent = table.innerHTML;
    }
    
    show() {
        const thead = this.table.querySelector('thead');
        const columnCount = thead ? thead.querySelectorAll('th').length : 3;
        
        let skeletonRows = '';
        for (let i = 0; i < this.rowCount; i++) {
            skeletonRows += '<tr class="skeleton-row">';
            for (let j = 0; j < columnCount; j++) {
                skeletonRows += '<td><div class="skeleton-cell"></div></td>';
            }
            skeletonRows += '</tr>';
        }
        
        const tbody = this.table.querySelector('tbody') || this.table;
        tbody.innerHTML = skeletonRows;
        
        return this;
    }
    
    hide() {
        this.table.innerHTML = this.originalContent;
        return this;
    }
}

// Instance globale
if (!window.loadingManager) {
    window.loadingManager = new LoadingManager();
}

// Raccourcis globaux
window.showLoading = (text, options) => {
    return window.loadingManager.show(text, options);
};

window.hideLoading = () => {
    return window.loadingManager.hide();
};

window.withLoading = (promise, text, options) => {
    return window.loadingManager.withLoading(promise, text, options);
};

console.log('🔧 Loading component loaded');
