// Configuration Supabase pour Dafnck Army
const SUPABASE_CONFIG = {
    url: 'https://cookuczvwgtljpfgwaya.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb2t1Y3p2d2d0bGpwZmd3YXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwMDcsImV4cCI6MjA2NzEyMTAwN30.KqoVO8pDgAsD0U_5zMHP7e1e6uoco9_8apRqQzQOFZQ'
};

// Initialisation du client Supabase
const supabase = window.supabase.createClient(
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

// Test de connexion
async function testSupabaseConnection() {
    try {
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
window.supabaseClient = supabase;
window.testSupabaseConnection = testSupabaseConnection;

console.log('🔧 Supabase configuration loaded');
