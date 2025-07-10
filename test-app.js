// Test simple pour identifier le problème
console.log('🔧 Test script loaded');

// Test des dépendances
console.log('Testing dependencies:');
console.log('- window.supabaseClient:', typeof window.supabaseClient);
console.log('- window.appState:', typeof window.appState);
console.log('- window.authManager:', typeof window.authManager);
console.log('- BaseComponent:', typeof BaseComponent);

// Test de création d'une classe simple
try {
    class TestApp {
        constructor() {
            console.log('✅ TestApp constructor works');
        }
    }
    
    const testApp = new TestApp();
    console.log('✅ TestApp instance created successfully');
} catch (error) {
    console.error('❌ Error creating TestApp:', error);
}

console.log('🔧 Test script completed');
