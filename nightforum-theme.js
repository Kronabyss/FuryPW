// NightForum Theme JavaScript Enhancements

(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }

    function initializeTheme() {
        console.log('Initializing NightForum theme...');

        // Add theme class to body
        document.body.classList.add('nightforum-theme');

        // Initialize node icons with proper content
        initializeNodeIcons();

        // Add enhanced hover effects
        addHoverEffects();

        // Initialize statistics animations
        initializeStatsAnimations();

        // Add gradient backgrounds and effects
        addGradientBackgrounds();

        // Add category icons to headers
        addCategoryIcons();

        // Initialize tooltips
        initializeTooltips();
    }

    function initializeNodeIcons() {
        const nodes = document.querySelectorAll('.node');

        // Define icon mappings based on common forum categories
        const iconMappings = [
            { keywords: ['web', 'development', 'html', 'css', 'javascript'], icon: '💻', class: 'node-icon--development' },
            { keywords: ['backend', 'server', 'api', 'database'], icon: '⚙️', class: 'node-icon--backend' },
            { keywords: ['mobile', 'ios', 'android', 'react native', 'flutter'], icon: '📱', class: 'node-icon--mobile' },
            { keywords: ['ui', 'ux', 'design', 'interface'], icon: '🎨', class: 'node-icon--design' },
            { keywords: ['graphics', 'multimedia', 'photoshop', 'video'], icon: '🖼️', class: 'node-icon--graphics' },
            { keywords: ['devops', 'infrastructure', 'cloud', 'deployment'], icon: '☁️', class: 'node-icon--devops' },
            { keywords: ['community', 'general', 'discussion', 'chat'], icon: '💬', class: 'node-icon--community' }
        ];

        nodes.forEach((node, index) => {
            const icon = node.querySelector('.node-icon');
            const title = node.querySelector('.node-title');

            if (icon) {
                const titleText = title ? title.textContent.toLowerCase() : '';

                // Find matching icon based on title keywords
                let matchedMapping = iconMappings.find(mapping =>
                    mapping.keywords.some(keyword => titleText.includes(keyword))
                );

                // If no match found, use index-based assignment
                if (!matchedMapping && index < iconMappings.length) {
                    matchedMapping = iconMappings[index];
                }

                if (matchedMapping) {
                    icon.classList.add(matchedMapping.class);
                    if (!icon.innerHTML.trim() || icon.innerHTML === '&nbsp;') {
                        icon.innerHTML = matchedMapping.icon;
                    }
                } else {
                    // Default icon for unmatched nodes
                    icon.innerHTML = '📁';
                    icon.classList.add('node-icon--default');
                }

                // Add hover effect to icons
                icon.addEventListener('mouseenter', function () {
                    this.style.transform = 'scale(1.1) rotate(5deg)';
                });

                icon.addEventListener('mouseleave', function () {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            }
        });
    }

    function addHoverEffects() {
        // Add smooth hover effects to nodes
        const nodes = document.querySelectorAll('.node');

        nodes.forEach(node => {
            node.addEventListener('mouseenter', function () {
                this.style.transform = 'translateX(4px)';
                this.style.transition = 'all 0.3s ease';
            });

            node.addEventListener('mouseleave', function () {
                this.style.transform = 'translateX(0)';
            });
        });

        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.button');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                if (this.classList.contains('button--cta')) {
                    this.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
                }
            });

            button.addEventListener('mouseleave', function () {
                this.style.boxShadow = '';
            });
        });
    }

    function initializeStatsAnimations() {
        // Animate statistics numbers
        const statNumbers = document.querySelectorAll('.pair-title');

        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/,/g, ''));

            if (!isNaN(number) && number > 0) {
                animateNumber(stat, 0, number, 1500);
            }
        });
    }

    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const originalText = element.textContent;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = originalText; // Restore original formatting
            }
        }

        requestAnimationFrame(update);
    }

    function addGradientBackgrounds() {
        // Add dynamic gradient backgrounds to certain elements
        const header = document.querySelector('.p-header');
        if (header) {
            header.style.background = 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)';
        }

        // Add particle effect background (optional)
        createParticleBackground();
    }

    function createParticleBackground() {
        // Create subtle particle background effect
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(createParticle());
            }
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                ctx.fill();
            });
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initParticles();
        animate();
    }

    // Theme toggle functionality (optional)
    function addThemeToggle() {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🌙';
        toggle.style.position = 'fixed';
        toggle.style.bottom = '20px';
        toggle.style.right = '20px';
        toggle.style.width = '50px';
        toggle.style.height = '50px';
        toggle.style.borderRadius = '50%';
        toggle.style.border = 'none';
        toggle.style.background = 'var(--accent-purple)';
        toggle.style.color = 'white';
        toggle.style.fontSize = '20px';
        toggle.style.cursor = 'pointer';
        toggle.style.zIndex = '1000';
        toggle.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
        toggle.style.transition = 'all 0.3s ease';

        toggle.addEventListener('click', function () {
            document.body.classList.toggle('light-mode');
            this.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        });

        document.body.appendChild(toggle);
    }

    function addCategoryIcons() {
        // Add icons to category headers
        const categoryHeaders = document.querySelectorAll('.block-header .block-title');

        categoryHeaders.forEach((header, index) => {
            const headerText = header.textContent.toLowerCase();
            let icon = '📁'; // default

            if (headerText.includes('development')) icon = '💻';
            else if (headerText.includes('design')) icon = '🎨';
            else if (headerText.includes('devops')) icon = '☁️';
            else if (headerText.includes('community')) icon = '💬';
            else if (headerText.includes('main')) icon = '🏠';

            // Only add icon if it doesn't already exist
            if (!header.querySelector('.category-icon')) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'category-icon';
                iconSpan.innerHTML = icon;
                iconSpan.style.marginRight = '8px';
                header.insertBefore(iconSpan, header.firstChild);
            }
        });
    }

    function initializeTooltips() {
        // Add tooltips to various elements
        const elementsWithTooltips = [
            { selector: '.node-icon', text: 'Forum Category' },
            { selector: '.avatar', text: 'Online User' },
            { selector: '.node-stats dt', text: 'Statistics' }
        ];

        elementsWithTooltips.forEach(({ selector, text }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.title) {
                    element.title = text;
                }
            });
        });
    }

    // Enhanced forum functionality
    function enhanceForumFeatures() {
        // Add read/unread indicators
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            const hasUnread = Math.random() > 0.5; // Simulate unread status
            if (hasUnread) {
                const indicator = document.createElement('div');
                indicator.className = 'unread-indicator';
                indicator.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 8px;
                    height: 8px;
                    background: #22d3ee;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
                `;
                node.style.position = 'relative';
                node.appendChild(indicator);
            }
        });

        // Add smooth scrolling to internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Initialize enhanced features
    enhanceForumFeatures();

    // Initialize theme toggle (uncomment if needed)
    // addThemeToggle();

})();
