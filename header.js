// header.js
(function() {
    // Load localforage via script tag instead of import
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js';
    document.head.appendChild(script);

    script.onload = function() {
        class EcoHeader extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            async connectedCallback() {
                // Initialize localforage instance
                this.store = localforage.createInstance({
                    name: 'ecoops-platform'
                });

                this.render();
                this.setActiveNavLink();
                this.addEventListeners();
            }

            render() {
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            width: 100%;
                            font-family: system-ui, -apple-system, sans-serif;
                        }

                        .header-container {
                            position: relative;
                            width: 100%;
                            height: 200px;
                            overflow: hidden;
                        }

                        nav {
                            position: relative;
                            z-index: 10;
                            background: rgba(0, 135, 90, 0.95);
                            padding: 1rem;
                        }

                        .nav-container {
                            max-width: 1200px;
                            margin: 0 auto;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        .nav-brand {
                            color: white;
                            font-size: 1.5rem;
                            font-weight: bold;
                            text-decoration: none;
                        }

                        .nav-links {
                            display: flex;
                            gap: 1rem;
                        }

                        .nav-link {
                            color: rgba(255, 255, 255, 0.8);
                            text-decoration: none;
                            padding: 0.5rem 1rem;
                            transition: color 0.3s ease;
                        }

                        .nav-link:hover {
                            color: white;
                        }

                        .nav-link.active {
                            color: white;
                            border-bottom: 2px solid white;
                        }

                        .header-content {
                            position: relative;
                            z-index: 5;
                            padding: 2rem;
                            color: white;
                        }

                        @media (max-width: 768px) {
                            .nav-links {
                                display: none;
                            }
                        }
                    </style>

                    <div class="header-container">
                        <svg class="header-bg" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:#00875A"/>
                                    <stop offset="100%" style="stop-color:#00A86B"/>
                                </linearGradient>
                                <pattern id="leafPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 10 Q40 20 30 30 Q20 20 30 10" fill="#ffffff15"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#headerGradient)"/>
                            <rect width="100%" height="100%" fill="url(#leafPattern)" opacity="0.5"/>
                            <path d="M50,180 Q80,140 50,100 Q20,140 50,180" fill="#ffffff20"/>
                            <path d="M30,190 Q60,150 30,110 Q0,150 30,190" fill="#ffffff15"/>
                            <path d="M70,170 Q100,130 70,90 Q40,130 70,170" fill="#ffffff25"/>
                            <path d="M1150,180 Q1120,140 1150,100 Q1180,140 1150,180" fill="#ffffff20"/>
                            <path d="M1170,190 Q1140,150 1170,110 Q1200,150 1170,190" fill="#ffffff15"/>
                            <path d="M1130,170 Q1100,130 1130,90 Q1160,130 1130,170" fill="#ffffff25"/>
                        </svg>

                        <nav>
                            <div class="nav-container">
                                <a href="index.html" class="nav-brand">EcoOps Platform</a>
                                <div class="nav-links">
                                    <a href="index.html" class="nav-link">Dashboard</a>
                                    <a href="knowledge.html" class="nav-link">Knowledge Transfer</a>
                                    <a href="projects.html" class="nav-link">Project Tracking</a>
                                    <a href="tokens.html" class="nav-link">Token Management</a>
                                    <a href="community.html" class="nav-link">Community Hub</a>
                                    <a href="impact.html" class="nav-link">Impact Analysis</a>
                                </div>
                            </div>
                        </nav>

                        <div class="header-content">
                            <slot></slot>
                        </div>
                    </div>
                `;
            }

            setActiveNavLink() {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const links = this.shadowRoot.querySelectorAll('.nav-link');
                links.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }

            addEventListeners() {
                const links = this.shadowRoot.querySelectorAll('.nav-link');
                links.forEach(link => {
                    link.addEventListener('click', async (e) => {
                        // Store last visited page
                        if (this.store) {
                            try {
                                await this.store.setItem('lastPath', link.getAttribute('href'));
                            } catch (err) {
                                console.warn('Could not save path to localforage:', err);
                            }
                        }
                    });
                });
            }
        }

        // Register the custom element
        customElements.define('eco-header', EcoHeader);
    };
})();
