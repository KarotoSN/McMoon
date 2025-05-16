document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated elements
    initAnimations();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup hero title animation
    animateHeroTitle();
    
    // Setup product card flip
    setupProductCards();
    
    // Setup product carousel
    setupProductCarousel();
    
    // Update year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Setup scroll behavior
    setupScrollBehavior();

    // Optimisation des images de fond
    lazyLoadBackgrounds();
    
    // Register service worker for PWA functionality
    registerServiceWorker();
    
    // Setup PWA install prompt
    setupPWAInstall();
});

// Initialize animations when elements come into view
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Sélection de tous les éléments à animer
    const revealElements = {
        up: document.querySelectorAll('.reveal-up'),
        upDelay: document.querySelectorAll('.reveal-up-delay'),
        upDelay2: document.querySelectorAll('.reveal-up-delay-2'),
        upDelay3: document.querySelectorAll('.reveal-up-delay-3'),
        left: document.querySelectorAll('.reveal-left'),
        leftDelay: document.querySelectorAll('.reveal-left-delay'),
        right: document.querySelectorAll('.reveal-right'),
        rightDelay: document.querySelectorAll('.reveal-right-delay')
    };
    
    // Configuration des transitions par type
    const setupElementAnimation = (element, transform, delay = 0) => {
        element.style.transform = transform;
        element.style.opacity = '0';
        element.style.transition = `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                                   opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        if (delay > 0) {
            element.style.transitionDelay = `${delay}s`;
        }
        observer.observe(element);
    };
    
    // Application des animations par groupe
    revealElements.up.forEach(el => setupElementAnimation(el, 'translateY(30px)'));
    revealElements.upDelay.forEach(el => setupElementAnimation(el, 'translateY(30px)', 0.2));
    revealElements.upDelay2.forEach(el => setupElementAnimation(el, 'translateY(30px)', 0.4));
    revealElements.upDelay3.forEach(el => setupElementAnimation(el, 'translateY(30px)', 0.6));
    revealElements.left.forEach(el => setupElementAnimation(el, 'translateX(-40px)'));
    revealElements.leftDelay.forEach(el => setupElementAnimation(el, 'translateX(-40px)', 0.2));
    revealElements.right.forEach(el => setupElementAnimation(el, 'translateX(40px)'));
    revealElements.rightDelay.forEach(el => setupElementAnimation(el, 'translateX(40px)', 0.2));
    
    // Appliquer les transformations lorsque les éléments sont révélés
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.revealed').forEach(el => {
            el.style.transform = 'translate(0)';
            el.style.opacity = '1';
        });
    }, { passive: true });
    
    // Déclencher pour les éléments visibles au chargement
    setTimeout(() => {
        document.dispatchEvent(new Event('scroll'));
    }, 100);
}

// Setup theme toggle with animations améliorées
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeDropdown = document.querySelector('.theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Vérifier les préférences de thème sauvegardées ou utiliser la préférence système
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Appliquer le thème actuel
    applyTheme(currentTheme);
    
    // Mettre en évidence l'option de thème active
    highlightActiveTheme(currentTheme);
    
    // Mise à jour de l'icône en fonction du thème actuel
    function updateThemeIcon(theme) {
        const themeIcon = themeToggleBtn.querySelector('.theme-icon');
        themeIcon.innerHTML = '';
        
        // SVGs pour les différents thèmes
        const icons = {
            light: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                </svg>`,
            dark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79z"></path>
                </svg>`,
            coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>`,
            mint: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"></path>
                    <path d="M12 6a6 6 0 0 1 6 6c0 2.5-2.5 4-6 4s-6-1.5-6-4a6 6 0 0 1 6-6z"></path>
                </svg>`,
            lavender: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 17.8L5.8 21 7 14.1 2 9.3l7-1L12 2l3 6.3 7 1-5 4.8 1.2 6.9-6.2-3.2z"></path>
                </svg>`
        };
        
        themeIcon.innerHTML = icons[theme] || icons.light;
    }
    
    // Mettre à jour l'icône au chargement
    updateThemeIcon(currentTheme);
    
    // Mettre à jour l'icône lors du changement de thème
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const newTheme = this.getAttribute('data-theme');
            updateThemeIcon(newTheme);
        });
    });
      // Animation de transition améliorée pour les changements de thème
    const addThemeTransition = () => {
        document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Ajout d'un overlay de transition pour un effet plus doux
        const transitionOverlay = document.createElement('div');
        transitionOverlay.style.position = 'fixed';
        transitionOverlay.style.top = '0';
        transitionOverlay.style.left = '0';
        transitionOverlay.style.width = '100%';
        transitionOverlay.style.height = '100%';
        transitionOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        transitionOverlay.style.pointerEvents = 'none';
        transitionOverlay.style.zIndex = '9999';
        transitionOverlay.style.opacity = '0';
        transitionOverlay.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(transitionOverlay);
        
        // Déclencher l'animation de transition
        setTimeout(() => {
            transitionOverlay.style.opacity = '0.1';
            setTimeout(() => {
                transitionOverlay.style.opacity = '0';
                setTimeout(() => {
                    transitionOverlay.remove();
                }, 500);
            }, 200);
        }, 0);
        
        // Ajouter des transitions pour les éléments principaux
        const elementsToTransition = [
            'a', 'button', '.card', '.hero-content', '.product', '.stat',
            '.recipe-item', '.footer', '.newsletter-content', 'header', 'nav',
            '.theme-dropdown', '.theme-option', '.btn', '.social-link'
        ];
        
        elementsToTransition.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.transition = 'color 0.5s ease, background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease';
            });
        });
    };
    
    // Ouvrir/fermer le dropdown au clic sur le bouton
    themeToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeDropdown.classList.toggle('active');
        
        // Animation du bouton
        themeToggleBtn.classList.add('theme-toggle-active');
        setTimeout(() => {
            themeToggleBtn.classList.remove('theme-toggle-active');
        }, 500);
    });
    
    // Fermer le dropdown au clic ailleurs sur la page
    document.addEventListener('click', function(e) {
        if (!themeDropdown.contains(e.target) && !themeToggleBtn.contains(e.target)) {
            themeDropdown.classList.remove('active');
        }
    });
    
    // Changer de thème au clic sur une option
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const newTheme = this.getAttribute('data-theme');
            
            // Ajouter la transition et appliquer le thème
            addThemeTransition();
            applyTheme(newTheme);
            
            // Mettre en évidence l'option active
            highlightActiveTheme(newTheme);
            
            // Sauvegarder la préférence
            localStorage.setItem('theme', newTheme);
            
            // Fermer le dropdown
            themeDropdown.classList.remove('active');
        });
    });
      // Fonctions utilitaires pour la gestion des thèmes
    function applyTheme(theme) {
        // Animation de changement de thème pour une expérience utilisateur plus fluide
        const oldThemeClass = localStorage.getItem('theme') !== 'light' ? 
            (localStorage.getItem('theme') === 'dark' ? 'dark' : `theme-${localStorage.getItem('theme')}`) : '';
        
        // Ajouter une classe de transition pour des animations plus fluides
        document.body.classList.add('theme-transition');
        
        // Retirer toutes les classes de thème précédentes
        document.body.classList.remove('dark', 'theme-coffee', 'theme-mint', 'theme-lavender');
        
        // Ajouter la classe correspondant au thème choisi
        if (theme !== 'light') {
            if (theme === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.add(`theme-${theme}`);
            }
        }
        
        // Mettre à jour les méta-tags pour les navigateurs mobiles
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const themeColors = {
                'light': '#f7fafa',
                'dark': '#1a2928',
                'coffee': '#f8f4f0',
                'mint': '#f0f8f5',
                'lavender': '#f5f3fa'
            };
            metaThemeColor.setAttribute('content', themeColors[theme] || themeColors.light);
        }
        
        // Retirer la classe de transition après un court délai
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
        
        // Personnaliser les favicon en fonction du thème actif
        updateFavicon(theme);
    }
    
    function highlightActiveTheme(theme) {
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    // Fonction pour mettre à jour le favicon en fonction du thème
    function updateFavicon(theme) {
        // Cette fonction pourrait être utilisée dans le futur pour adapter le favicon
        // selon le thème choisi si le site dispose de différentes versions du favicon
        // Pour l'instant, on ne modifie pas le favicon existant
    }

    // Ajouter des événements pour de meilleures animations de transition de thème
    document.addEventListener('themeChange', function(e) {
        // Créer un effet de particules qui s'adaptent au thème actuel
        const createThemeChangeEffect = () => {
            // Cette fonction pourrait être utilisée pour ajouter un effet visuel
            // lors du changement de thème, comme des particules ou un flash subtil
            // Pour l'instant, on se contente des transitions CSS standard
        };
        
        // Appliquer l'effet si nécessaire
        if (e.detail && e.detail.animate) {
            createThemeChangeEffect();
        }
    });
    
    // Améliorer la fonction de changement de thème pour qu'elle émette un événement
    const oldApplyTheme = applyTheme;
    applyTheme = function(theme, options = {}) {
        oldApplyTheme(theme);
        
        // Émettre un événement personnalisé pour le changement de thème
        const event = new CustomEvent('themeChange', {
            detail: {
                theme: theme,
                animate: options.animate !== false
            }
        });
        document.dispatchEvent(event);
    };
}

// Setup mobile menu avec animations améliorées
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Amélioration de l'animation du menu
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = mobileNav.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animation des icônes
        if (isExpanded) {
            menuIcon.style.transform = 'rotate(90deg)';
            menuIcon.style.opacity = '0';
            
            setTimeout(() => {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                
                setTimeout(() => {
                    closeIcon.style.transform = 'rotate(0deg)';
                    closeIcon.style.opacity = '1';
                }, 50);
            }, 200);
        } else {
            closeIcon.style.transform = 'rotate(90deg)';
            closeIcon.style.opacity = '0';
            
            setTimeout(() => {
                closeIcon.style.display = 'none';
                menuIcon.style.display = 'block';
                
                setTimeout(() => {
                    menuIcon.style.transform = 'rotate(0deg)';
                    menuIcon.style.opacity = '1';
                }, 50);
            }, 200);
        }
        
        // Animation du fond pendant l'ouverture du menu
        if (isExpanded) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', false);
            
            closeIcon.style.transform = 'rotate(90deg)';
            closeIcon.style.opacity = '0';
            
            setTimeout(() => {
                closeIcon.style.display = 'none';
                menuIcon.style.display = 'block';
                
                setTimeout(() => {
                    menuIcon.style.transform = 'rotate(0deg)';
                    menuIcon.style.opacity = '1';
                }, 50);
            }, 200);
            
            document.body.classList.remove('menu-open');
        });
    });
}

// Animer le titre du hero avec un effet lettre par lettre
function animateHeroTitle() {
    const title = document.getElementById('animated-title');
    if (!title) return;
    
    const text = title.textContent;
    let html = '';
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            html += ' ';
        } else {
            html += `<span class="animated-letter" style="animation-delay: ${0.05 * i}s">${text[i]}</span>`;
        }
    }
    
    title.innerHTML = html;
    
    // Animation supplémentaire après l'animation des lettres
    setTimeout(() => {
        title.classList.add('title-glow');
    }, text.length * 50 + 500);
}

// Configuration des fiches produits
function setupProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Effet de survol amélioré
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-image');
            const title = this.querySelector('.product-title');
            
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            if (title) {
                title.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.product-image');
            const title = this.querySelector('.product-title');
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            if (title) {
                title.style.color = '';
            }
        });
        
        // Gestion du flip des cartes
        const flipBtn = card.querySelector('.product-flip-btn');
        const flipBackBtn = card.querySelector('.product-flip-back');
        
        if (flipBtn) {
            flipBtn.addEventListener('click', function() {
                card.classList.add('flipped');
            });
        }
        
        if (flipBackBtn) {
            flipBackBtn.addEventListener('click', function() {
                card.classList.remove('flipped');
            });
        }
    });
}

// Configuration du carousel de produits
function setupProductCarousel() {
    const carousel = document.querySelector('.products-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.product-card');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardWidth = cards[0].offsetWidth;
    const cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = Math.max(0, Math.ceil(cards.length / cardsPerView) - 1);
    
    // Créer les points de navigation si le conteneur existe
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Voir groupe de produits ${i + 1}`);
            dotsContainer.appendChild(dot);
        }
    }
    
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    // Mettre à jour le carousel et les indicateurs
    function updateCarousel() {
        const offset = -currentIndex * cardWidth * cardsPerView;
        track.style.transform = `translateX(${offset}px)`;
        
        // Animation du déplacement
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Mettre à jour les points actifs
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Mettre à jour l'état des boutons
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
            prevButton.classList.toggle('disabled', currentIndex === 0);
        }
        
        if (nextButton) {
            nextButton.disabled = currentIndex === maxIndex;
            nextButton.classList.toggle('disabled', currentIndex === maxIndex);
        }
    }
    
    // Configuration des boutons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Configuration des points de navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Support des gestes tactiles
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        // Désactiver les transitions pendant le glissement
        track.style.transition = 'none';
    }, { passive: true });
    
    track.addEventListener('touchmove', e => {
        const touchCurrentX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchCurrentX;
        const baseOffset = -currentIndex * cardWidth * cardsPerView;
        
        // Limiter le glissement aux extrémités
        if ((currentIndex === 0 && diff < 0) || (currentIndex === maxIndex && diff > 0)) {
            track.style.transform = `translateX(${baseOffset - diff * 0.2}px)`;
        } else {
            track.style.transform = `translateX(${baseOffset - diff}px)`;
        }
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        // Réactiver les transitions
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Distance minimale de glissement
            if (diff > 0 && currentIndex < maxIndex) { // Glissement vers la gauche
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) { // Glissement vers la droite
                currentIndex--;
            }
        }
        
        updateCarousel();
    }, { passive: true });
    
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        // Recalculer les dimensions après redimensionnement
        cardWidth = cards[0].offsetWidth;
        const newCardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        
        if (newCardsPerView !== cardsPerView) {
            const newMaxIndex = Math.max(0, Math.ceil(cards.length / newCardsPerView) - 1);
            currentIndex = Math.min(currentIndex, newMaxIndex);
        }
        
        updateCarousel();
    });
    
    // Initialiser le carousel
    updateCarousel();
}

// Configuration du comportement au défilement
function setupScrollBehavior() {
    const header = document.querySelector('.header');
    const scrollUpButton = document.querySelector('.scroll-to-top');
    let lastScrollTop = 0;
    let scrollTimer;
    
    // Fonction pour vérifier la position de défilement et mettre à jour l'interface
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight
        );
        
        // Ajouter/supprimer la classe 'scrolled' pour changer l'apparence du header
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Montrer/cacher le bouton de retour en haut
        if (scrollUpButton) {
            if (scrollTop > window.innerHeight) {
                scrollUpButton.classList.add('visible');
            } else {
                scrollUpButton.classList.remove('visible');
            }
        }
        
        // Ajouter la classe 'scrolling-up' ou 'scrolling-down' pour les animations
        if (scrollTop > lastScrollTop) {
            document.body.classList.remove('scrolling-up');
            document.body.classList.add('scrolling-down');
        } else {
            document.body.classList.remove('scrolling-down');
            document.body.classList.add('scrolling-up');
        }
        
        // Ajouter une classe pour indiquer la position dans la page
        const scrollPercentage = scrollTop / (scrollHeight - window.innerHeight);
        document.body.classList.toggle('scroll-top', scrollPercentage < 0.1);
        document.body.classList.toggle('scroll-middle', scrollPercentage >= 0.1 && scrollPercentage <= 0.9);
        document.body.classList.toggle('scroll-bottom', scrollPercentage > 0.9);
        
        lastScrollTop = scrollTop;
        
        // Désactiver la classe 'is-scrolling' après 200ms d'inactivité
        clearTimeout(scrollTimer);
        document.body.classList.add('is-scrolling');
        
        scrollTimer = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 200);
    };
    
    // Optimisation du scroll avec requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Configuration du défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculer la position de défilement avec un décalage pour le header fixe
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans rechargement
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Configuration du bouton de retour en haut
    if (scrollUpButton) {
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Déclencher une fois au chargement
    handleScroll();
}

// Optimisation des images de fond pour améliorer les performances
function lazyLoadBackgrounds() {
    const bgElements = document.querySelectorAll('.lazy-background');
    
    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgUrl = element.dataset.background;
                    
                    if (bgUrl) {
                        // Précharger l'image
                        const img = new Image();
                        img.onload = function() {
                            element.style.backgroundImage = `url(${bgUrl})`;
                            element.classList.add('loaded');
                        };
                        img.src = bgUrl;
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '200px'
        });
        
        bgElements.forEach(element => {
            bgObserver.observe(element);
        });
    } else {
        // Fallback pour les navigateurs ne supportant pas IntersectionObserver
        bgElements.forEach(element => {
            const bgUrl = element.dataset.background;
            if (bgUrl) {
                element.style.backgroundImage = `url(${bgUrl})`;
            }
        });
    }
}

// Initialiser une vidéo d'arrière-plan en différé pour améliorer les performances
function initBackgroundVideo() {
    const bgVideoContainers = document.querySelectorAll('.bg-video-container');
    
    bgVideoContainers.forEach(container => {
        const videoUrl = container.dataset.videoSrc;
        if (!videoUrl) return;
        
        // Créer l'élément vidéo uniquement lorsque la page est entièrement chargée
        window.addEventListener('load', () => {
            setTimeout(() => {
                const video = document.createElement('video');
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.className = 'bg-video';
                
                const source = document.createElement('source');
                source.src = videoUrl;
                source.type = 'video/mp4';
                
                video.appendChild(source);
                container.appendChild(video);
                
                // Attendre que la vidéo soit chargée pour l'afficher progressivement
                video.addEventListener('loadeddata', () => {
                    container.classList.add('video-loaded');
                });
                
                // Démarrer la lecture
                video.play().catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Fallback pour les navigateurs qui bloquent l'autoplay
                    container.classList.add('video-fallback');
                });
            }, 1000); // Délai pour améliorer les performances au chargement initial
        });
    });
}

// Service Worker Registration for PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
}

// PWA Install Prompt Handling
function setupPWAInstall() {
    let deferredPrompt;
    const installButton = document.createElement('button');
    installButton.classList.add('install-button');
    installButton.textContent = 'Installer l\'application';
    installButton.style.display = 'none';
    
    // Add install button to the header
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.appendChild(installButton);
    }
    
    // Save the event for later use
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show the install button
        installButton.style.display = 'block';
    });
    
    // Handle install button click
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        
        // Hide the install button
        installButton.style.display = 'none';
    });
    
    // Detect when the app is installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        
        // Hide the install button
        installButton.style.display = 'none';
        
        // Show a thank you message or take other actions
        const installNotification = document.createElement('div');
        installNotification.classList.add('install-notification');
        installNotification.textContent = 'Merci d\'avoir installé K-fee!';
        document.body.appendChild(installNotification);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            installNotification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(installNotification);
            }, 500);
        }, 3000);
    });
}

// Add styles for the PWA install button and notification
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .install-button {
            background-color: var(--color-primary);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            margin-left: 16px;
            transition: background-color 0.3s ease;
        }
        
        .install-button:hover {
            background-color: var(--color-primary-dark);
        }
        
        .install-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--color-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .install-notification.fade-out {
            opacity: 0;
        }
        
        @media (max-width: 768px) {
            .install-button {
                margin: 8px 0 0 0;
                width: 100%;
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(style);
});
