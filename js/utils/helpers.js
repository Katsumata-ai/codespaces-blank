// Helpers utilitaires pour Dafnck Army
const Helpers = {
    // Générer un ID unique
    generateId: () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Deep clone object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // Merge objects
    merge: (...objects) => {
        return Object.assign({}, ...objects);
    },
    
    // Get nested property safely
    get: (obj, path, defaultValue = undefined) => {
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result == null || typeof result !== 'object') {
                return defaultValue;
            }
            result = result[key];
        }
        
        return result !== undefined ? result : defaultValue;
    },
    
    // Set nested property
    set: (obj, path, value) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = obj;
        
        for (const key of keys) {
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
        return obj;
    },
    
    // Sleep function
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // Escape HTML
    escapeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Strip HTML tags
    stripHtml: (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },
    
    // Generate random string
    randomString: (length = 10) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Check if object is empty
    isEmpty: (obj) => {
        if (obj == null) return true;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
        return Object.keys(obj).length === 0;
    },
    
    // Group array by property
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },
    
    // Sort array by property
    sortBy: (array, key, direction = 'asc') => {
        return array.sort((a, b) => {
            const aVal = Helpers.get(a, key);
            const bVal = Helpers.get(b, key);
            
            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    },
    
    // Filter array by multiple criteria
    filterBy: (array, filters) => {
        return array.filter(item => {
            return Object.keys(filters).every(key => {
                const filterValue = filters[key];
                const itemValue = Helpers.get(item, key);
                
                if (filterValue == null) return true;
                if (typeof filterValue === 'string') {
                    return itemValue.toString().toLowerCase().includes(filterValue.toLowerCase());
                }
                return itemValue === filterValue;
            });
        });
    },
    
    // Calculate pagination
    paginate: (array, page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        const paginatedItems = array.slice(offset, offset + limit);
        const totalPages = Math.ceil(array.length / limit);
        
        return {
            items: paginatedItems,
            currentPage: page,
            totalPages,
            totalItems: array.length,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
    },
    
    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },
    
    // Download file
    downloadFile: (data, filename, type = 'text/plain') => {
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    },
    
    // Get URL parameters
    getUrlParams: () => {
        // Gérer les paramètres dans le hash pour le hash routing
        let searchString = window.location.search;

        // Si pas de paramètres dans search, vérifier dans le hash
        if (!searchString && window.location.hash) {
            const hashParts = window.location.hash.split('?');
            if (hashParts.length > 1) {
                searchString = '?' + hashParts.slice(1).join('?');
            }
        }

        const params = new URLSearchParams(searchString);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },
    
    // Set URL parameter
    setUrlParam: (key, value) => {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.replaceState({}, '', url);
    },
    
    // Remove URL parameter
    removeUrlParam: (key) => {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.replaceState({}, '', url);
    },
    
    // Check if mobile device
    isMobile: () => {
        return window.innerWidth <= 768;
    },
    
    // Check if touch device
    isTouchDevice: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    // Get device info
    getDeviceInfo: () => {
        return {
            isMobile: Helpers.isMobile(),
            isTouch: Helpers.isTouchDevice(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        };
    }
};

console.log('🔧 Helpers loaded');
