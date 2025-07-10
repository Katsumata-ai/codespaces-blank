// Configuration Supabase pour Dafnck Army
let SUPABASE_CONFIG = {
    url: null,
    anonKey: null
};

// Variable pour stocker l'instance Supabase
let supabase = null;

// Fonction pour initialiser Supabase
async function initSupabase() {
    try {
        // Récupérer la configuration depuis l'API
        const response = await fetch('/api/config');
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de la configuration: ${response.status}`);
        }

        const config = await response.json();

        // Mettre à jour la configuration
        SUPABASE_CONFIG = {
            url: config.supabase.url,
            anonKey: config.supabase.anonKey
        };

        console.log('🔧 Configuration Supabase récupérée depuis le serveur');

        // Initialisation du client Supabase
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey,
            {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true
                }
            }
        );

        // Exposer globalement
        window.supabaseClient = supabase;

        return supabase;
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de Supabase:', error);

        // Fallback pour le développement local (ne pas utiliser en production)
        console.warn('⚠️ Utilisation des valeurs de fallback pour Supabase (développement uniquement)');
        SUPABASE_CONFIG = {
            url: 'https://cookuczvwgtljpfgwaya.supabase.co',
            anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb2t1Y3p2d2d0bGpwZmd3YXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwMDcsImV4cCI6MjA2NzEyMTAwN30.KqoVO8pDgAsD0U_5zMHP7e1e6uoco9_8apRqQzQOFZQ'
        };

        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey,
            {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true
                }
            }
        );

        window.supabaseClient = supabase;
        return supabase;
    }
}

// Test de connexion
async function testSupabaseConnection() {
    try {
        // S'assurer que Supabase est initialisé
        if (!supabase) {
            await initSupabase();
        }

        const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

        if (error) {
            console.warn('Supabase connection test - Table users not found yet:', error.message);
            return { connected: true, tablesReady: false };
        }

        console.log('✅ Supabase connected successfully');
        return { connected: true, tablesReady: true };
    } catch (error) {
        console.error('❌ Supabase connection failed:', error);
        return { connected: false, tablesReady: false };
    }
}

// Export global
window.initSupabase = initSupabase;
window.testSupabaseConnection = testSupabaseConnection;

// Initialiser Supabase au chargement
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initSupabase();
        console.log('🔧 Supabase initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Supabase:', error);
    }
});

console.log('🔧 Supabase configuration module loaded');
