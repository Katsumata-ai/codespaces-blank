// Formateurs pour Dafnck Army
const Formatters = {
    // Formatage de devise
    currency: (amount, currency = 'EUR') => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Formatage de nombre
    number: (number) => {
        return new Intl.NumberFormat('fr-FR').format(number);
    },
    
    // Formatage de nombre compact (1K, 1M, etc.)
    compactNumber: (number) => {
        return new Intl.NumberFormat('fr-FR', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(number);
    },
    
    // Formatage de date
    date: (date, options = {}) => {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return new Intl.DateTimeFormat('fr-FR', { ...defaultOptions, ...options })
            .format(new Date(date));
    },
    
    // Formatage de date relative (il y a X jours)
    relativeDate: (date) => {
        const now = new Date();
        const targetDate = new Date(date);
        const diffInSeconds = Math.floor((now - targetDate) / 1000);
        
        if (diffInSeconds < 60) {
            return 'À l\'instant';
        }
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
        }
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
        }
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
        }
        
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `Il y a ${diffInMonths} mois`;
        }
        
        const diffInYears = Math.floor(diffInMonths / 12);
        return `Il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
    },
    
    // Formatage de pourcentage
    percentage: (value, decimals = 1) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    },
    
    // Formatage de durée (en secondes vers format lisible)
    duration: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    },
    
    // Formatage de taille de fichier
    fileSize: (bytes) => {
        const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To'];
        if (bytes === 0) return '0 octet';
        
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },
    
    // Formatage de statut avec emoji
    status: (status) => {
        const statusMap = {
            'pending': '⏳ En attente',
            'validated': '✅ Validé',
            'tag_missing': '❌ Tag manquant',
            'approved': '🎉 Approuvé',
            'rejected': '❌ Refusé',
            'paid': '💰 Payé',
            'active': '🟢 Actif',
            'paused': '⏸️ En pause',
            'completed': '✅ Terminé',
            'cancelled': '❌ Annulé',
            'draft': '📝 Brouillon'
        };
        
        return statusMap[status] || status;
    },
    
    // Formatage de rôle
    role: (role) => {
        const roleMap = {
            'startup': '🏢 Startup',
            'creator': '🎥 Créateur'
        };
        
        return roleMap[role] || role;
    },
    
    // Formatage d'URL courte
    shortUrl: (url, maxLength = 50) => {
        if (url.length <= maxLength) return url;
        
        const start = url.substring(0, maxLength / 2);
        const end = url.substring(url.length - maxLength / 2);
        return `${start}...${end}`;
    },
    
    // Formatage de texte tronqué
    truncate: (text, maxLength = 100, suffix = '...') => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - suffix.length) + suffix;
    },
    
    // Formatage de nom d'utilisateur
    username: (email) => {
        return email.split('@')[0];
    },
    
    // Formatage de tag unique
    campaignTag: (campaignId) => {
        return `DAFNCK_${campaignId.substring(0, 8).toUpperCase()}`;
    }
};

console.log('🔧 Formatters loaded');
