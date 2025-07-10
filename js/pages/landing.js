// Page d'accueil Dafnck Army - Version 2.0 Optimisée
class LandingPage extends BaseComponent {
    constructor(params) {
        super(params);
        this.title = 'Dafnck Army - La plateforme UGC la plus rapide';
        this.currentUserRole = null;
    }

    async render() {
        const isAuthenticated = window.appState?.getState('isAuthenticated');
        const user = window.appState?.getState('user');
        let userRole = window.appState?.getState('userRole');

        // Récupérer le rôle utilisateur si connecté et pas encore défini
        if (isAuthenticated && user && !userRole) {
            try {
                const { data: profile } = await window.supabaseClient
                    .from('users')
                    .select('role, profile_completed')
                    .eq('id', user.id)
                    .single();
                userRole = profile?.role;
                this.currentUserRole = userRole;
                // Mettre à jour l'état global
                window.appState?.setState({ userRole });
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        } else {
            this.currentUserRole = userRole;
        }

        return `
            <div class="landing-page-new" data-component="LandingPage">
                <style>
                    :root {
                        --primary-light: #F0F8FF;
                        --primary-white: #FFFFFF;
                        --secondary-blue: #1E3A8A;
                        --accent-black: #000000;
                        --gradient-hero: linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 50%, #1E3A8A 100%);
                        --shadow-soft: 0 4px 12px rgba(30, 58, 138, 0.1);
                        --shadow-strong: 0 8px 25px rgba(30, 58, 138, 0.3);
                    }

                    .landing-page-new {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: var(--accent-black);
                        background: var(--primary-white);
                        min-height: 100vh;
                    }

                    /* Header Styles */
                    .header-new {
                        position: fixed;
                        top: 0;
                        width: 100%;
                        background: rgba(240, 248, 255, 0.95);
                        backdrop-filter: blur(10px);
                        border-bottom: 1px solid rgba(30, 58, 138, 0.1);
                        z-index: 1000;
                        transition: all 0.3s ease;
                    }

                    .nav-container-new {
                        max-width: 1200px;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0.75rem 1.5rem;
                    }

                    .logo-new {
                        height: 50px;
                        width: 50px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 2px solid var(--secondary-blue);
                        box-shadow: 0 2px 8px rgba(30, 58, 138, 0.2);
                    }

                    .brand-container {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }

                    .brand-text {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--secondary-blue);
                        font-family: 'Inter', sans-serif;
                        letter-spacing: 0.5px;
                    }

                    .nav-links-new {
                        display: flex;
                        gap: 2rem;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    .nav-links-new a {
                        text-decoration: none;
                        color: var(--secondary-blue);
                        font-weight: 500;
                        transition: color 0.3s ease;
                        position: relative;
                        cursor: pointer;
                    }

                    .nav-links-new a:hover,
                    .nav-links-new a.active {
                        color: var(--accent-black);
                    }

                    .nav-buttons-new {
                        display: flex;
                        gap: 1rem;
                        align-items: center;
                        position: relative;
                    }

                    .header-user-section {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                    }

                    .header-explore-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        background: rgba(255, 255, 255, 0.9);
                        border: 1px solid rgba(30, 58, 138, 0.2);
                        border-radius: 50px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 0.875rem;
                        font-weight: 600;
                        color: var(--secondary-blue);
                        text-decoration: none;
                        height: 44px;
                    }

                    .header-explore-btn:hover {
                        background: white;
                        box-shadow: var(--shadow-soft);
                        transform: translateY(-1px);
                    }

                    .user-menu {
                        position: relative;
                        display: inline-block;
                    }

                    .user-menu-trigger {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        padding: 0;
                        background: none;
                        border: none;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .user-avatar {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                        background: rgba(255, 255, 255, 0.9);
                        border-radius: 50%;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(30, 58, 138, 0.2);
                        width: 44px;
                        height: 44px;
                        overflow: hidden;
                    }

                    .user-menu-trigger:hover .user-avatar {
                        background: white;
                        transform: translateY(-1px);
                    }

                    .avatar-image {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    .dropdown-arrow {
                        color: rgba(255, 255, 255, 0.8);
                        transition: all 0.3s ease;
                    }

                    .user-menu-trigger:hover .dropdown-arrow {
                        color: white;
                        transform: translateY(-1px);
                    }

                    .dropdown-arrow {
                        margin-left: 0.25rem;
                    }

                    .dropdown-menu {
                        position: absolute;
                        top: 100%;
                        right: 0;
                        background: white;
                        border: 1px solid rgba(30, 58, 138, 0.1);
                        border-radius: 8px;
                        box-shadow: var(--shadow-strong);
                        min-width: 180px;
                        z-index: 1000;
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(-10px);
                        transition: all 0.3s ease;
                    }

                    .dropdown-menu.show {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }

                    .dropdown-item {
                        display: block;
                        width: 100%;
                        padding: 0.75rem 1rem;
                        text-align: left;
                        border: none;
                        background: none;
                        color: var(--accent-black);
                        cursor: pointer;
                        transition: background-color 0.2s ease;
                        font-size: 0.9rem;
                    }

                    .dropdown-item:hover {
                        background: var(--primary-light);
                    }

                    .dropdown-item:first-child {
                        border-radius: 8px 8px 0 0;
                    }

                    .dropdown-item:last-child {
                        border-radius: 0 0 8px 8px;
                        border-top: 1px solid rgba(30, 58, 138, 0.1);
                        color: #dc2626;
                    }

                    .btn-new {
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        text-decoration: none;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-size: 0.9rem;
                        background: transparent;
                    }

                    .btn-primary-new {
                        background: var(--secondary-blue) !important;
                        color: var(--primary-white) !important;
                    }

                    .btn-primary-new:hover {
                        transform: translateY(-2px);
                        box-shadow: var(--shadow-strong);
                    }

                    .btn-secondary-new {
                        background: transparent !important;
                        color: var(--secondary-blue) !important;
                        border: 2px solid var(--secondary-blue) !important;
                    }

                    .btn-secondary-new:hover {
                        background: var(--secondary-blue) !important;
                        color: var(--primary-white) !important;
                    }

                    /* Hero Section */
                    .hero-new {
                        min-height: 100vh;
                        background: var(--gradient-hero);
                        display: flex;
                        align-items: center;
                        position: relative;
                        overflow: hidden;
                        padding-top: 80px;
                    }

                    .hero-new::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="camo" patternUnits="userSpaceOnUse" width="20" height="20"><rect width="20" height="20" fill="%23F0F8FF"/><polygon points="0,0 10,0 5,10" fill="%231E3A8A" opacity="0.1"/><polygon points="10,10 20,10 15,20" fill="%23000000" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23camo)"/></svg>') repeat;
                        opacity: 0.3;
                    }

                    .hero-container-new {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 2rem;
                        text-align: center;
                        position: relative;
                        z-index: 2;
                    }

                    .hero-badge-new {
                        display: inline-flex;
                        align-items: center;
                        background: rgba(255, 255, 255, 0.95);
                        padding: 0.75rem 1.5rem;
                        border-radius: 50px;
                        margin-bottom: 3rem;
                        font-size: 0.9rem;
                        font-weight: 600;
                        color: var(--secondary-blue);
                        box-shadow: var(--shadow-soft);
                        border: 1px solid rgba(30, 58, 138, 0.1);
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }

                    .hero-badge-new:hover {
                        transform: translateY(-2px);
                        box-shadow: var(--shadow-strong);
                    }

                    .hero-title-container {
                        margin-bottom: 2rem;
                    }

                    .hero-title-new {
                        font-size: 4rem;
                        font-weight: 800;
                        line-height: 1.1;
                        margin: 0;
                        text-align: center;
                    }

                    .animated-word-container {
                        position: relative;
                        display: inline-block;
                        height: 1.2em;
                        overflow: hidden;
                        vertical-align: top;
                    }

                    .animated-word {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        opacity: 0;
                        transform: translateY(100%);
                        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                        background: linear-gradient(135deg, #10B981, #059669);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        font-weight: 900;
                    }

                    .animated-word.active {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .hero-subtitle-new {
                        font-size: 1.3rem;
                        color: var(--secondary-blue);
                        margin-bottom: 2.5rem;
                        max-width: 700px;
                        margin-left: auto;
                        margin-right: auto;
                        line-height: 1.6;
                        opacity: 0.9;
                    }



                    .hero-ctas-new {
                        display: flex;
                        gap: 1.5rem;
                        justify-content: center;
                        flex-wrap: wrap;
                    }

                    .cta-primary-hero {
                        background: linear-gradient(135deg, #1E3A8A, #3B82F6);
                        color: white;
                        padding: 1.2rem 2.5rem;
                        font-size: 1.1rem;
                        border-radius: 16px;
                        border: none;
                        cursor: pointer;
                        font-weight: 700;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-width: 200px;
                    }

                    .cta-secondary-hero {
                        background: transparent;
                        color: var(--secondary-blue);
                        padding: 1.2rem 2.5rem;
                        font-size: 1.1rem;
                        border-radius: 16px;
                        border: 2px solid var(--secondary-blue);
                        cursor: pointer;
                        font-weight: 700;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-width: 200px;
                    }

                    .cta-primary-hero:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 12px 35px rgba(30, 58, 138, 0.4);
                    }

                    .cta-secondary-hero:hover {
                        background: var(--secondary-blue);
                        color: white;
                        transform: translateY(-3px);
                        box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
                    }

                    .cta-creator-new {
                        background: linear-gradient(135deg, #60A5FA, #93C5FD) !important;
                        color: white !important;
                        padding: 1rem 2rem;
                        font-size: 1.1rem;
                        border-radius: 12px;
                        border: none;
                        cursor: pointer;
                        font-weight: 700;
                        transition: all 0.3s ease;
                        box-shadow: var(--shadow-soft);
                    }

                    .cta-startup-new {
                        background: linear-gradient(135deg, #1E3A8A, #3B82F6) !important;
                        color: white !important;
                        padding: 1rem 2rem;
                        font-size: 1.1rem;
                        border-radius: 12px;
                        border: none;
                        cursor: pointer;
                        font-weight: 700;
                        transition: all 0.3s ease;
                        box-shadow: var(--shadow-soft);
                    }

                    .cta-creator-new:hover,
                    .cta-startup-new:hover {
                        transform: translateY(-3px);
                        box-shadow: var(--shadow-strong);
                    }

                    /* Enhanced CTA hover effects */
                    .cta-creator-new:hover {
                        box-shadow: 0 12px 30px rgba(96, 165, 250, 0.5) !important;
                    }

                    .cta-startup-new:hover {
                        box-shadow: 0 12px 30px rgba(30, 58, 138, 0.5) !important;
                    }

                    /* Responsive */
                    @media (max-width: 768px) {
                        .nav-links-new {
                            display: none;
                        }

                        .nav-container-new {
                            padding: 0.75rem 1rem;
                        }

                        .brand-text {
                            font-size: 1.3rem;
                        }

                        .hero-title-new {
                            font-size: 2.8rem;
                        }

                        .hero-subtitle-new {
                            font-size: 1.1rem;
                            padding: 0 1rem;
                        }

                        .hero-stats-preview {
                            flex-direction: column;
                            gap: 1rem;
                            padding: 0 1rem;
                        }

                        .stat-item-mini {
                            padding: 0.75rem 1rem;
                        }

                        .hero-ctas-new {
                            flex-direction: column;
                            align-items: center;
                            padding: 0 1rem;
                        }

                        .cta-primary-hero,
                        .cta-secondary-hero {
                            width: 100%;
                            max-width: 300px;
                            padding: 1rem 2rem;
                        }
                    }

                    @media (max-width: 480px) {
                        .hero-title-new {
                            font-size: 2.2rem;
                        }

                        .brand-text {
                            display: none;
                        }

                        .hero-badge-new {
                            font-size: 0.8rem;
                            padding: 0.5rem 1rem;
                        }
                    }
                </style>

                <!-- Header -->
                <header class="header-new">
                    <div class="nav-container-new">
                        <div class="brand-container">
                            <img src="/assets/logo.svg" alt="Dafnck Army" class="logo-new">
                            <span class="brand-text">Dafnck Army</span>
                        </div>

                        <nav class="nav-links-new">
                            <a href="#for-creators">For Creators</a>
                            <a href="#for-startups">For Businesses</a>
                            <a href="#mission">Our Mission</a>
                        </nav>

                        <div class="nav-buttons-new">
                            <!-- Guest buttons -->
                            ${!isAuthenticated ? `
                                <button class="btn-new btn-secondary-new" data-action="role-selection">Get Started</button>
                                <button class="btn-new btn-primary-new" data-action="signin">Sign In</button>
                            ` : ''}

                            <!-- Authenticated user menu -->
                            ${isAuthenticated ? `
                                <div class="header-user-section">
                                    <button class="header-explore-btn" data-action="explorer">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                        <span>Explore</span>
                                    </button>
                                    <div class="user-menu">
                                        <button class="user-menu-trigger" data-action="toggle-menu">
                                            <div class="user-avatar">
                                                <img src="/assets/default-avatar.svg" alt="Profile" class="avatar-image">
                                            </div>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="dropdown-arrow">
                                                <path d="M7 10l5 5 5-5z"/>
                                            </svg>
                                        </button>
                                        <div class="dropdown-menu" id="user-dropdown">
                                            <button class="dropdown-item" data-action="profile">⚙️ Settings</button>
                                            <button class="dropdown-item" data-action="logout">🚪 Sign Out</button>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </header>

                <!-- Hero Section -->
                <section id="hero" class="hero-new">
                    <div class="hero-container-new">
                        <!-- Launch badge -->
                        <div class="hero-badge-new">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 0.5rem;">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            The fastest UGC platform on the market
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 0.5rem;">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                        </div>

                        <!-- Animated title -->
                        <div class="hero-title-container">
                            <h1 class="hero-title-new">
                                <span style="color: var(--secondary-blue);">Create content that goes</span>
                                <span class="animated-word-container">
                                    <span class="animated-word active" data-word="viral">viral</span>
                                    <span class="animated-word" data-word="authentic">authentic</span>
                                    <span class="animated-word" data-word="profitable">profitable</span>
                                    <span class="animated-word" data-word="impactful">impactful</span>
                                </span>
                            </h1>
                        </div>

                        <p class="hero-subtitle-new">
                            Join the first UGC platform where creators and startups collaborate without friction.
                            Instant access, automatic payments, guaranteed results.
                        </p>

                        <!-- Guest CTAs -->
                        ${!isAuthenticated ? `
                            <div class="hero-ctas-new">
                                <button class="cta-primary-hero" data-action="signup-creator">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 0.5rem;">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                    I'm a Creator
                                </button>
                                <button class="cta-secondary-hero" data-action="signup-startup">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 0.5rem;">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                    I'm a Business
                                </button>
                            </div>
                        ` : ''}

                        <!-- Authenticated CTAs -->
                        ${isAuthenticated ? `
                            <div class="hero-ctas-new">
                                <button class="cta-primary-hero" data-action="explorer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 0.5rem;">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                    Explore Campaigns
                                </button>
                                <button class="cta-secondary-hero" data-action="profile">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 0.5rem;">
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    My Profile
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </section>

                <!-- Stats Section -->
                <section class="stats-new" style="background: var(--primary-white); padding: 4rem 2rem; text-align: center;">
                    <div style="max-width: 1200px; margin: 0 auto;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">
                            Free & Instant System
                        </h2>
                        <p style="font-size: 1.2rem; color: var(--accent-black); margin-bottom: 2rem;">
                            Join a campaign in 30 seconds. No application, no waiting.
                        </p>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 2rem;">
                            <div style="padding: 2rem; background: var(--primary-light); border-radius: 12px; box-shadow: var(--shadow-soft); transition: transform 0.3s ease;">
                                <div style="font-size: 2.5rem; font-weight: 800; color: var(--secondary-blue); margin-bottom: 0.5rem;">30s</div>
                                <div style="color: var(--accent-black); font-weight: 600;">Time-to-value</div>
                            </div>
                            <div style="padding: 2rem; background: var(--primary-light); border-radius: 12px; box-shadow: var(--shadow-soft); transition: transform 0.3s ease;">
                                <div style="font-size: 2.5rem; font-weight: 800; color: var(--secondary-blue); margin-bottom: 0.5rem;">2.5€</div>
                                <div style="color: var(--accent-black); font-weight: 600;">Per 1000 views</div>
                            </div>
                            <div style="padding: 2rem; background: var(--primary-light); border-radius: 12px; box-shadow: var(--shadow-soft); transition: transform 0.3s ease;">
                                <div style="font-size: 2.5rem; font-weight: 800; color: var(--secondary-blue); margin-bottom: 0.5rem;">0%</div>
                                <div style="color: var(--accent-black); font-weight: 600;">Friction</div>
                            </div>
                            <div style="padding: 2rem; background: var(--primary-light); border-radius: 12px; box-shadow: var(--shadow-soft); transition: transform 0.3s ease;">
                                <div style="font-size: 2.5rem; font-weight: 800; color: var(--secondary-blue); margin-bottom: 0.5rem;">500+</div>
                                <div style="color: var(--accent-black); font-weight: 600;">Active creators</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- How It Works Section -->
                <section id="how-it-works" style="padding: 6rem 2rem; background: var(--primary-light);">
                    <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">
                            How it works
                        </h2>
                        <p style="font-size: 1.2rem; color: var(--accent-black); margin-bottom: 4rem;">
                            3 simple steps to join the viral marketing army
                        </p>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                            <div style="background: white; padding: 3rem 2rem; border-radius: 16px; box-shadow: var(--shadow-soft); position: relative;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: white; font-size: 1.5rem; font-weight: bold;">1</div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">🎯 Choose your mission</h3>
                                <p style="color: var(--accent-black); line-height: 1.6;">Explore active campaigns with transparent CPM, visible budget and creators already engaged.</p>
                            </div>

                            <div style="background: white; padding: 3rem 2rem; border-radius: 16px; box-shadow: var(--shadow-soft); position: relative;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--secondary-blue), #1E40AF); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: white; font-size: 1.5rem; font-weight: bold;">2</div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">⚡ Join instantly</h3>
                                <p style="color: var(--accent-black); line-height: 1.6;">One click and you're in the campaign. No application, no waiting. Direct access if profile completed.</p>
                            </div>

                            <div style="background: white; padding: 3rem 2rem; border-radius: 16px; box-shadow: var(--shadow-soft); position: relative;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #F59E0B, #D97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: white; font-size: 1.5rem; font-weight: bold;">3</div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">💰 Earn automatically</h3>
                                <p style="color: var(--accent-black); line-height: 1.6;">Submit your videos, get validation and receive your CPM payments automatically in real time.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- For Creators Section -->
                <section id="for-creators" style="padding: 6rem 2rem; background: white;">
                    <div style="max-width: 1200px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                            <div>
                                <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--secondary-blue);">
                                    Pour les Créateurs
                                </h2>
                                <p style="font-size: 1.2rem; color: var(--accent-black); margin-bottom: 2rem; line-height: 1.6;">
                                    Monétisez votre créativité sans friction. Accès libre à toutes les campagnes, paiements instantanés, transparence totale.
                                </p>

                                <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Accès libre à toutes les campagnes</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Paiements automatiques par 1000 vues</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Dashboard dédié par mission</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Métriques temps réel</span>
                                    </div>
                                </div>

                                <button class="cta-creator-new" data-action="signup-creator" style="margin-top: 1rem;">
                                    ⚡ Commencer maintenant
                                </button>
                            </div>

                            <div style="background: var(--primary-light); padding: 3rem; border-radius: 16px; text-align: center;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🎬</div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">Exemple de revenus</h3>
                                <div style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 1rem;">
                                    <div style="font-size: 2rem; font-weight: bold; color: var(--secondary-blue); margin-bottom: 0.5rem;">125€</div>
                                    <div style="color: var(--accent-black);">Pour 50K vues à 2.5€ CPM</div>
                                </div>
                                <p style="color: var(--accent-black); font-size: 0.9rem;">Calculé automatiquement et payé instantanément</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- For Startups Section -->
                <section id="for-startups" style="padding: 6rem 2rem; background: var(--primary-light);">
                    <div style="max-width: 1200px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                            <div style="background: white; padding: 3rem; border-radius: 16px; text-align: center;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--secondary-blue);">Campagne en 5 minutes</h3>
                                <div style="background: var(--primary-light); padding: 2rem; border-radius: 12px; margin-bottom: 1rem;">
                                    <div style="font-size: 2rem; font-weight: bold; color: var(--secondary-blue); margin-bottom: 0.5rem;">500€</div>
                                    <div style="color: var(--accent-black);">Budget → 200K vues garanties</div>
                                </div>
                                <p style="color: var(--accent-black); font-size: 0.9rem;">ROI transparent et budget maîtrisé</p>
                            </div>

                            <div>
                                <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--secondary-blue);">
                                    Pour les Startups
                                </h2>
                                <p style="font-size: 1.2rem; color: var(--accent-black); margin-bottom: 2rem; line-height: 1.6;">
                                    Mobilisez une armée de créateurs en minutes. Campagne active instantanément, budget maîtrisé, ROI transparent.
                                </p>

                                <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: var(--secondary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Campagne active en 5 minutes</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: var(--secondary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Créateurs rejoignent automatiquement</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: var(--secondary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Paiement uniquement aux résultats</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 24px; height: 24px; background: var(--secondary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                                        <span style="color: var(--accent-black); font-weight: 500;">Analytics temps réel</span>
                                    </div>
                                </div>

                                <button class="cta-startup-new" data-action="signup-startup" style="margin-top: 1rem;">
                                    🎯 Lancer ma campagne
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Why Dafnck Army Section -->
                <section id="mission" style="padding: 6rem 2rem; background: white;">
                    <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--secondary-blue);">
                            Pourquoi Dafnck Army ?
                        </h2>
                        <p style="font-size: 1.2rem; color: var(--accent-black); margin-bottom: 4rem; max-width: 800px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                            Parce que le marketing d'influence est cassé. Parce que les créateurs méritent mieux. Parce que les startups ont besoin de résultats, pas de promesses.
                        </p>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-bottom: 4rem;">
                            <div style="background: var(--primary-light); padding: 3rem 2rem; border-radius: 16px;">
                                <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div>
                                <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--secondary-blue);">vs ReachCat</h3>
                                <p style="color: var(--accent-black); line-height: 1.6;">Accès libre vs candidature obligatoire. Rejoignez en 30 secondes au lieu de 3 jours.</p>
                            </div>

                            <div style="background: var(--primary-light); padding: 3rem 2rem; border-radius: 16px;">
                                <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎯</div>
                                <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--secondary-blue);">vs Whop</h3>
                                <p style="color: var(--accent-black); line-height: 1.6;">Interface gamifiée vs basique. Dashboard dédié par mission avec métriques temps réel.</p>
                            </div>

                            <div style="background: var(--primary-light); padding: 3rem 2rem; border-radius: 16px;">
                                <div style="font-size: 2.5rem; margin-bottom: 1rem;">🛡️</div>
                                <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--secondary-blue);">Sécurité Totale</h3>
                                <p style="color: var(--accent-black); line-height: 1.6;">Stripe Connect vs IBAN manuel. Paiements automatiques vs virements manuels.</p>
                            </div>
                        </div>

                        <div style="background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E40AF 100%); padding: 4rem 3rem; border-radius: 24px; color: white; text-align: center; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(30, 58, 138, 0.3);">
                            <!-- Decorative elements -->
                            <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.5;"></div>
                            <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>

                            <div style="position: relative; z-index: 2;">
                                <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.15); padding: 0.5rem 1.5rem; border-radius: 50px; margin-bottom: 2rem; backdrop-filter: blur(10px);">
                                    <span style="font-size: 1.2rem;">🎖️</span>
                                    <span style="font-weight: 600; font-size: 0.9rem;">ACCÈS ANTICIPÉ</span>
                                </div>

                                <h3 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 800; background: linear-gradient(45deg, #FFFFFF, #F0F8FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                    Rejoignez l'élite Dafnck Army
                                </h3>
                                <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                                    Soyez parmi les premiers à révolutionner le marketing d'influence avec la plateforme la plus rapide du marché
                                </p>

                                <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
                                    <button class="cta-creator-new" data-action="signup-creator" style="background: linear-gradient(135deg, #60A5FA, #93C5FD) !important; color: white !important; padding: 1.2rem 2.5rem; font-size: 1.1rem; border: none; border-radius: 16px; font-weight: 700; box-shadow: 0 8px 25px rgba(96, 165, 250, 0.4); transform: translateY(0); transition: all 0.3s ease;">
                                        ⚡ Créateur d'élite
                                    </button>
                                    <button class="cta-startup-new" data-action="signup-startup" style="background: linear-gradient(135deg, #1E3A8A, #3B82F6) !important; color: white !important; padding: 1.2rem 2.5rem; font-size: 1.1rem; border: none; border-radius: 16px; font-weight: 700; box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4); transform: translateY(0); transition: all 0.3s ease;">
                                        🎯 Startup visionnaire
                                    </button>
                                </div>

                                <div style="display: flex; justify-content: center; gap: 2rem; font-size: 0.9rem; opacity: 0.8;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span>✓</span>
                                        <span>Accès immédiat</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span>✓</span>
                                        <span>Support prioritaire</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span>✓</span>
                                        <span>Fonctionnalités exclusives</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer style="background: linear-gradient(135deg, #000000 0%, #1E3A8A 100%); color: white; padding: 4rem 2rem 2rem;">
                    <div style="max-width: 1200px; margin: 0 auto;">
                        <!-- Footer main content -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
                            <!-- Brand section -->
                            <div>
                                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                                    <img src="/assets/logo.svg" alt="Dafnck Army" style="height: 50px; width: 50px;">
                                    <span style="font-size: 1.5rem; font-weight: 800; font-family: 'Inter', sans-serif;">Dafnck Army</span>
                                </div>
                                <p style="opacity: 0.8; line-height: 1.6; margin-bottom: 1.5rem;">
                                    La plateforme UGC la plus rapide du marché. Révolutionnons le marketing d'influence ensemble.
                                </p>
                                <div style="display: flex; gap: 1rem;">
                                    <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                                        <span style="font-size: 1.2rem;">📧</span>
                                    </div>
                                    <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                                        <span style="font-size: 1.2rem;">💬</span>
                                    </div>
                                    <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                                        <span style="font-size: 1.2rem;">🐦</span>
                                    </div>
                                </div>
                            </div>

                            <!-- For Creators -->
                            <div>
                                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem; color: #10B981;">Pour les Créateurs</h4>
                                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                    <a href="#for-creators" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Explorer les campagnes</a>
                                    <a href="#how-it-works" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Comment ça marche</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Calculateur de revenus</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Guide du créateur</a>
                                </div>
                            </div>

                            <!-- For Startups -->
                            <div>
                                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem; color: #F59E0B;">Pour les Startups</h4>
                                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                    <a href="#for-startups" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Lancer une campagne</a>
                                    <a href="#mission" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Pourquoi Dafnck Army</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Calculateur ROI</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Études de cas</a>
                                </div>
                            </div>

                            <!-- Support -->
                            <div>
                                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem; color: #3B82F6;">Support</h4>
                                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Centre d'aide</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Contact</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">Statut de la plateforme</a>
                                    <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease;">API Documentation</a>
                                </div>
                            </div>
                        </div>

                        <!-- Footer bottom -->
                        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                            <div style="display: flex; gap: 2rem; font-size: 0.9rem; opacity: 0.8;">
                                <a href="#" style="color: inherit; text-decoration: none;">Conditions d'utilisation</a>
                                <a href="#" style="color: inherit; text-decoration: none;">Politique de confidentialité</a>
                                <a href="#" style="color: inherit; text-decoration: none;">Cookies</a>
                            </div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">
                                © 2024 Dafnck Army. Tous droits réservés.
                            </div>
                        </div>

                        <!-- Military quote -->
                        <div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 12px; border-left: 4px solid #10B981;">
                            <p style="font-style: italic; font-size: 1.1rem; opacity: 0.9; margin: 0;">
                                "Dans cette armée, chaque vue compte, chaque créateur gagne, chaque startup réussit."
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        `;
    }
    
    async init() {
        // Event listeners pour les actions
        this.addEventListener(document, 'click', (e) => {
            const action = e.target.closest('[data-action]');
            if (action) {
                e.preventDefault();
                const actionType = action.dataset.action;
                this.handleAction(actionType);
            }

            const target = e.target.closest('[data-role]');
            if (target) {
                e.preventDefault();
                const role = target.dataset.role;
                this.handleRoleSelection(role);
            }
        });

        // Event listeners pour les liens de navigation avec ancres
        this.addEventListener(document, 'click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Animation d'entrée
        this.animateOnScroll();

        // Navigation highlighting
        this.initializeNavigation();

        // Animated words in hero
        this.initializeWordAnimation();

        // Close dropdown when clicking outside
        this.addEventListener(document, 'click', (e) => {
            const userMenu = e.target.closest('.user-menu');
            const dropdown = document.getElementById('user-dropdown');
            if (!userMenu && dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    handleRoleSelection(role) {
        // Stocker le rôle sélectionné temporairement
        sessionStorage.setItem('selectedRole', role);

        // Rediriger vers l'authentification
        this.router.navigate('/auth');
    }

    handleGetStarted() {
        // Rediriger vers la page de sélection de rôle
        this.router.navigate('/role-selection');
    }
    
    handleAction(action) {
        switch (action) {
            case 'login':
                this.router.navigate('/auth?mode=login');
                break;
            case 'signin':
                // Redirection vers login sans rôle spécifique
                window.location.hash = '/auth?mode=login';
                break;
            case 'signup':
                this.router.navigate('/auth?mode=signup');
                break;
            case 'signup-creator':
                sessionStorage.setItem('selectedRole', 'creator');
                this.router.navigate('/auth?mode=signup&role=creator');
                break;
            case 'signup-startup':
                sessionStorage.setItem('selectedRole', 'startup');
                this.router.navigate('/auth?mode=signup&role=startup');
                break;
            case 'role-selection':
                this.handleGetStarted();
                break;
            case 'explorer':
                this.router.navigate('/explorer');
                break;
            case 'metrics':
                this.router.navigate('/metrics');
                break;
            case 'missions':
                this.router.navigate('/submissions');
                break;
            case 'campaign':
                this.router.navigate('/campaign/create');
                break;
            case 'profile':
                this.router.navigate('/profile');
                break;
            case 'toggle-menu':
                this.toggleUserMenu();
                break;
            case 'logout':
                this.handleLogout();
                break;
        }
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    async handleLogout() {
        try {
            if (window.authManager) {
                await window.authManager.signOut();
            } else {
                // Fallback direct avec Supabase
                await window.supabaseClient.auth.signOut();
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: reload page
            window.location.reload();
        }
    }
    
    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        const animatedElements = document.querySelectorAll('[style*="padding: 2rem"], [style*="padding: 3rem"]');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-links-new a');

        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initializeWordAnimation() {
        const words = document.querySelectorAll('.animated-word');
        if (words.length === 0) return;

        let currentIndex = 0;

        const animateWords = () => {
            // Remove active class from all words
            words.forEach(word => word.classList.remove('active'));

            // Add active class to current word
            words[currentIndex].classList.add('active');

            // Move to next word
            currentIndex = (currentIndex + 1) % words.length;
        };

        // Start animation
        animateWords();

        // Continue animation every 2 seconds
        setInterval(animateWords, 2000);
    }
}

console.log('🔧 Landing Page loaded');
