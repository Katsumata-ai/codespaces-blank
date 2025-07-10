// Modern Authentication page for Dafnck Army
class AuthPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Authentication - Dafnck Army';
        this.mode = this.getMode(); // 'login' or 'signup'
        this.selectedRole = this.getSelectedRole(); // Doit être appelé après getMode()
        this.showPassword = false;
        this.showConfirmPassword = false;
    }
    
    getMode() {
        const urlParams = Helpers.getUrlParams();
        return urlParams.mode || 'signup';
    }

    getSelectedRole() {
        // En mode login, ne jamais récupérer de rôle
        const urlParams = Helpers.getUrlParams();
        const mode = urlParams.mode || 'signup';
        if (mode === 'login') {
            // Nettoyer le sessionStorage en mode login
            sessionStorage.removeItem('selectedRole');
            return null;
        }

        return urlParams.role || sessionStorage.getItem('selectedRole') || null;
    }
    
    async render() {
        const isLogin = this.mode === 'login';
        const roleText = this.selectedRole === 'creator' ? 'Creator' : this.selectedRole === 'startup' ? 'Business' : '';
        const roleEmoji = this.selectedRole === 'creator' ? '⚡' : this.selectedRole === 'startup' ? '🎯' : '🎖️';
        
        return `
            <div class="auth-page-container" data-component="AuthPage">
                <style>
                    .auth-page-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background: #F8FAFC;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                        padding: 2rem 1rem;
                    }

                    .auth-logo-header {
                        margin-bottom: 2rem;
                    }

                    .logo-button {
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        transition: all 0.2s ease;
                    }

                    .logo-button:hover {
                        transform: translateY(-1px);
                    }

                    .logo-brand {
                        font-size: 1.75rem;
                        font-weight: 800;
                        color: #1E3A8A;
                        letter-spacing: 0.05em;
                    }

                    .auth-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        max-width: 420px;
                        width: 100%;
                    }

                    .auth-title {
                        margin: 0 0 0.5rem 0;
                        text-align: center;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #1E3A8A;
                        line-height: 1.2;
                    }

                    .auth-subtitle {
                        margin: 0 0 1.5rem 0;
                        text-align: center;
                        font-size: 0.875rem;
                        color: #6B7280;
                        line-height: 1.4;
                    }

                    .role-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.375rem 0.875rem;
                        border-radius: 50px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        margin-bottom: 0.75rem;
                    }

                    .role-badge-creator {
                        background: linear-gradient(135deg, #60A5FA, #93C5FD);
                        color: white;
                    }

                    .role-badge-startup {
                        background: linear-gradient(135deg, #1E3A8A, #3B82F6);
                        color: white;
                    }

                    .auth-card {
                        background: white;
                        color: #1E3A8A;
                        display: flex;
                        flex-direction: column;
                        border-radius: 0.75rem;
                        border: 1px solid #E5E7EB;
                        padding: 2rem;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        position: relative;
                    }

                    .auth-footer {
                        margin-top: 1.5rem;
                        text-align: center;
                    }

                    .forgot-password {
                        background: none;
                        border: none;
                        color: #3B82F6;
                        font-size: 0.875rem;
                        cursor: pointer;
                        margin-bottom: 1rem;
                        text-decoration: none;
                        padding: 0;
                    }

                    .forgot-password:hover {
                        color: #1E40AF;
                        text-decoration: underline;
                    }

                    .auth-form {
                        display: flex;
                        flex-direction: column;
                        gap: 0.875rem;
                    }

                    .form-group {
                        display: flex;
                        flex-direction: column;
                        gap: 0.375rem;
                    }

                    .form-label {
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: #1E3A8A;
                        margin: 0;
                    }

                    .form-input {
                        height: 2.5rem;
                        width: 100%;
                        border-radius: 0.375rem;
                        border: 1px solid #D1D5DB;
                        background: white;
                        padding: 0 0.75rem;
                        font-size: 0.875rem;
                        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                        transition: all 0.2s;
                        outline: none;
                    }

                    .form-input:focus {
                        border-color: #1E3A8A;
                        box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
                    }

                    .form-input::placeholder {
                        color: #9CA3AF;
                    }

                    .password-container {
                        position: relative;
                    }

                    .password-toggle {
                        position: absolute;
                        right: 0.75rem;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #6B7280;
                        padding: 0.25rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .password-toggle:hover {
                        color: #1E3A8A;
                    }

                    .checkbox-container {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-top: 0.25rem;
                    }

                    .custom-checkbox {
                        height: 1rem;
                        width: 1rem;
                        flex-shrink: 0;
                        border-radius: 0.25rem;
                        border: 1px solid #D1D5DB;
                        transition: all 0.2s;
                        outline: none;
                        cursor: pointer;
                    }

                    .custom-checkbox:checked {
                        background-color: #1E3A8A;
                        border-color: #1E3A8A;
                    }

                    .checkbox-label {
                        font-size: 0.8rem;
                        line-height: 1.3;
                        color: #6B7280;
                        cursor: pointer;
                    }

                    .auth-button {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 0.375rem;
                        font-size: 0.875rem;
                        font-weight: 600;
                        transition: all 0.2s;
                        outline: none;
                        background: #1E3A8A;
                        color: white;
                        height: 2.5rem;
                        margin-top: 1.25rem;
                        width: 100%;
                        border: none;
                        cursor: pointer;
                    }

                    .auth-button:hover {
                        background: #1E40AF;
                    }

                    .auth-button:disabled {
                        pointer-events: none;
                        opacity: 0.5;
                    }

                    .auth-button-creator {
                        background: #60A5FA;
                    }

                    .auth-button-creator:hover {
                        background: #3B82F6;
                    }

                    .auth-button-startup {
                        background: #1E3A8A;
                    }

                    .auth-button-startup:hover {
                        background: #1E40AF;
                    }

                    .terms-text {
                        text-align: center;
                        font-size: 0.75rem;
                        color: #6B7280;
                        margin-top: 0.75rem;
                        line-height: 1.4;
                    }

                    .terms-link {
                        color: #1E3A8A;
                        text-decoration: none;
                    }

                    .terms-link:hover {
                        color: #1E40AF;
                        text-decoration: underline;
                    }

                    .auth-toggle {
                        margin-top: 1.25rem;
                        text-align: center;
                        font-size: 0.875rem;
                        color: #6B7280;
                    }

                    .auth-toggle-link {
                        font-weight: 600;
                        color: #1E3A8A;
                        text-decoration: none;
                        background: none;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                        font-size: inherit;
                        font-family: inherit;
                    }

                    .auth-toggle-link:hover {
                        color: #1E40AF;
                        text-decoration: underline;
                    }

                    @media (min-width: 640px) {
                        .auth-content {
                            margin: 0 auto;
                            width: 100%;
                            max-width: 28rem;
                        }
                    }
                </style>

                <!-- Logo cliquable centré en haut -->
                <div class="auth-logo-header">
                    <button class="logo-button" data-action="home">
                        <span class="logo-brand">DAFNCK ARMY</span>
                    </button>
                </div>

                <!-- Contenu d'authentification compact -->
                <div class="auth-content">
                    <div class="auth-card">
                        ${!isLogin && this.selectedRole ? `
                            <div class="role-badge role-badge-${this.selectedRole}">
                                ${roleEmoji} ${roleText} Account
                            </div>
                        ` : ''}

                        <h1 class="auth-title">
                            ${isLogin ? 'Sign In' : `Create new ${roleText ? roleText.toLowerCase() : ''} account`}
                        </h1>

                        ${!isLogin && roleText ? `
                            <p class="auth-subtitle">Join Dafnck Army and create your first ${roleText.toLowerCase() === 'creator' ? 'content' : 'campaign'}</p>
                        ` : isLogin ? `
                            <p class="auth-subtitle">Sign in to access your ${roleText ? roleText.toLowerCase() : ''} creations</p>
                        ` : ''}

                        <form class="auth-form" data-auth-form>
                            ${this.renderFormFields()}

                            <button type="submit" class="auth-button ${!isLogin && this.selectedRole ? `auth-button-${this.selectedRole}` : ''}">
                                ${isLogin ? 'Sign in' : 'Create my account'}
                            </button>
                        </form>

                        <div class="auth-footer">
                            <p class="auth-toggle">
                                ${isLogin ? "New to Dafnck Army?" : "Already have an account?"}
                                <button type="button" class="auth-toggle-link" data-mode="${isLogin ? 'role-selection' : 'login'}">
                                    ${isLogin ? 'Choose a role' : 'Sign in'}
                                </button>
                            </p>

                            ${isLogin ? `
                                <button type="button" class="forgot-password" data-action="forgot-password">
                                    Forgot password?
                                </button>
                            ` : ''}

                            <p class="terms-text">
                                By ${isLogin ? 'using our service' : 'creating an account'}, you agree to our
                                <a href="/terms" class="terms-link">Terms of Service</a> and
                                <a href="/privacy" class="terms-link">Privacy Policy</a>${!isLogin ? '. Contact us for more information.' : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFormFields() {
        const isLogin = this.mode === 'login';

        return `
            ${!isLogin ? `
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        autocomplete="name"
                        placeholder="Enter your full name"
                        class="form-input"
                        required
                    />
                </div>
            ` : ''}

            <div class="form-group">
                <label class="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="Enter your email address"
                    class="form-input"
                    required
                />
            </div>

            <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password-container">
                    <input
                        type="password"
                        name="password"
                        autocomplete="${isLogin ? 'current-password' : 'new-password'}"
                        placeholder="Enter your password"
                        class="form-input"
                        style="padding-right: 2.5rem;"
                        required
                    />
                    <button type="button" class="password-toggle" data-toggle-password="password">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
            </div>

            ${!isLogin ? `
                <div class="form-group">
                    <label class="form-label">Confirm password</label>
                    <div class="password-container">
                        <input
                            type="password"
                            name="confirmPassword"
                            autocomplete="new-password"
                            placeholder="Confirm your password"
                            class="form-input"
                            style="padding-right: 2.5rem;"
                            required
                        />
                        <button type="button" class="password-toggle" data-toggle-password="confirmPassword">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="checkbox-container">
                    <input type="checkbox" name="newsletter" class="custom-checkbox" />
                    <label class="checkbox-label">
                        Sign up to our newsletter
                    </label>
                </div>
            ` : ''}
        `;
    }

    async init() {
        // Event listeners pour les actions
        this.addEventListener(document, 'click', (e) => {
            const actionButton = e.target.closest('[data-action]');
            if (actionButton) {
                e.preventDefault();
                const action = actionButton.dataset.action;
                console.log('🔄 Action clicked:', action);
                if (action === 'home') {
                    this.router.navigate('/');
                } else if (action === 'forgot-password') {
                    this.handleForgotPassword();
                }
            }

            const modeToggle = e.target.closest('[data-mode]');
            if (modeToggle) {
                e.preventDefault();
                const mode = modeToggle.dataset.mode;
                console.log('🔄 Mode toggle clicked:', mode);
                if (mode === 'role-selection') {
                    window.location.hash = '/role-selection';
                } else if (mode === 'login') {
                    window.location.hash = '/auth?mode=login';
                } else {
                    this.setMode(mode);
                }
            }
        });

        // Event listeners pour les password toggles
        this.addEventListener(document, 'click', (e) => {
            const toggle = e.target.closest('[data-toggle-password]');
            if (toggle) {
                e.preventDefault();
                this.togglePasswordVisibility(toggle);
            }
        });

        // Event listener pour le formulaire
        this.addEventListener('[data-auth-form]', 'submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e.target);
        });

        // Auto-focus sur le premier champ
        setTimeout(() => {
            const firstInput = document.querySelector('[data-auth-form] input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }

    handleForgotPassword() {
        this.showNotification('Password reset functionality coming soon!', 'info');
    }

    togglePasswordVisibility(toggle) {
        const fieldType = toggle.dataset.togglePassword;
        const container = toggle.closest('.password-container');
        const input = container.querySelector('input');
        const isPassword = input.type === 'password';

        input.type = isPassword ? 'text' : 'password';

        // Update icon
        const svg = toggle.querySelector('svg');
        if (svg) {
            if (isPassword) {
                // Show "eye-off" icon
                svg.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22"/>
                `;
            } else {
                // Show "eye" icon
                svg.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
            }
        }
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.email || !data.password) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Additional validation for signup
        if (this.mode === 'signup') {
            if (!data.name) {
                this.showNotification('Please enter your full name', 'error');
                return;
            }
            if (data.password !== data.confirmPassword) {
                this.showNotification('Passwords do not match', 'error');
                return;
            }
            if (data.password.length < 6) {
                this.showNotification('Password must be at least 6 characters', 'error');
                return;
            }
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = this.mode === 'login' ? 'Signing in...' : 'Creating account...';
        }

        try {
            if (this.mode === 'login') {
                await this.handleLogin(data);
            } else {
                await this.handleSignup(data);
            }
        } catch (error) {
            console.error('Auth error:', error);
            this.showNotification(error.message || 'An error occurred', 'error');
        } finally {
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = this.mode === 'login' ? 'Sign in' : 'Create account';
            }
        }
    }

    async handleLogin(data) {
        console.log('🔄 Login attempt for:', data.email);

        const { error } = await window.supabaseClient.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            throw error;
        }

        this.showNotification('Welcome back!', 'success');
        console.log('✅ Login successful - auth state change will handle redirect');
        // La redirection sera gérée par handleSignIn dans auth.js
    }

    async handleSignup(data) {
        console.log('🔄 Signup attempt with role:', this.selectedRole);

        const { error } = await window.supabaseClient.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    full_name: data.name,
                    role: this.selectedRole || 'creator'
                }
            }
        });

        if (error) {
            throw error;
        }

        this.showNotification('Account created! Please check your email to verify your account.', 'success');

        console.log('✅ Signup successful - auth state change will handle redirect');
        // La redirection sera gérée par handleSignIn dans auth.js avec context 'signup'
    }

    setMode(mode) {
        this.mode = mode;

        // Pour le hash routing, naviguer directement
        const roleParam = this.selectedRole ? `&role=${this.selectedRole}` : '';
        window.location.hash = `/auth?mode=${mode}${roleParam}`;
    }
}

console.log('🔧 Auth Page loaded');
