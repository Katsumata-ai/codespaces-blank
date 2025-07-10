// Validateurs pour Dafnck Army
const Validators = {
    // Email
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    // Mot de passe (minimum 8 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre)
    password: (value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
    },
    
    // Champ requis
    required: (value) => {
        return value && value.trim().length > 0;
    },
    
    // Longueur minimum
    minLength: (min) => (value) => {
        return value && value.length >= min;
    },
    
    // Longueur maximum
    maxLength: (max) => (value) => {
        return value && value.length <= max;
    },
    
    // Nombre positif
    positiveNumber: (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
    },
    
    // URL valide
    url: (value) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },
    
    // URL de vidéo TikTok
    tiktokUrl: (value) => {
        const tiktokRegex = /^https:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/;
        return tiktokRegex.test(value);
    },
    
    // URL de vidéo YouTube
    youtubeUrl: (value) => {
        const youtubeRegex = /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
        return youtubeRegex.test(value);
    },
    
    // URL de vidéo (TikTok ou YouTube)
    videoUrl: (value) => {
        return Validators.tiktokUrl(value) || Validators.youtubeUrl(value);
    },
    
    // CPM valide (entre 1 et 100 euros)
    cpm: (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 1 && num <= 100;
    },
    
    // Budget valide (minimum 10 euros)
    budget: (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 10;
    }
};

// Règles de validation prédéfinies
const ValidationRules = {
    signup: {
        email: [
            { validator: Validators.required, message: 'L\'email est requis' },
            { validator: Validators.email, message: 'Format d\'email invalide' }
        ],
        password: [
            { validator: Validators.required, message: 'Le mot de passe est requis' },
            { validator: Validators.password, message: 'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre' }
        ]
    },
    
    login: {
        email: [
            { validator: Validators.required, message: 'L\'email est requis' },
            { validator: Validators.email, message: 'Format d\'email invalide' }
        ],
        password: [
            { validator: Validators.required, message: 'Le mot de passe est requis' }
        ]
    },
    
    campaign: {
        title: [
            { validator: Validators.required, message: 'Le titre est requis' },
            { validator: Validators.minLength(5), message: 'Le titre doit contenir au moins 5 caractères' },
            { validator: Validators.maxLength(100), message: 'Le titre ne peut pas dépasser 100 caractères' }
        ],
        description: [
            { validator: Validators.required, message: 'La description est requise' },
            { validator: Validators.minLength(20), message: 'La description doit contenir au moins 20 caractères' },
            { validator: Validators.maxLength(1000), message: 'La description ne peut pas dépasser 1000 caractères' }
        ],
        budget_total: [
            { validator: Validators.required, message: 'Le budget est requis' },
            { validator: Validators.budget, message: 'Le budget minimum est de 10€' }
        ],
        cpm_rate: [
            { validator: Validators.required, message: 'Le CPM est requis' },
            { validator: Validators.cpm, message: 'Le CPM doit être entre 1€ et 100€' }
        ]
    },
    
    submission: {
        video_url: [
            { validator: Validators.required, message: 'L\'URL de la vidéo est requise' },
            { validator: Validators.videoUrl, message: 'URL de vidéo invalide (TikTok ou YouTube uniquement)' }
        ]
    }
};

console.log('🔧 Validators loaded');
