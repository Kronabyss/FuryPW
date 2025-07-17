// NightForum Theme JavaScript Enhancements

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
    });
    
    function initializeTheme() {
        // Add theme class to body
        document.body.classList.add('nightforum-theme');
        
        // Initialize node icons
        initializeNodeIcons();
        
        // Add hover effects
        addHoverEffects();
        
        // Initialize statistics animations
        initializeStatsAnimations();
        
        // Add gradient backgrounds
        addGradientBackgrounds();
    }
    
    function initializeNodeIcons() {
        const nodes = document.querySelectorAll('.node');
        
        nodes.forEach(node => {
            const icon = node.querySelector('.node-icon');
            const title = node.querySelector('.node-title');
            
            if (icon && title) {
                const titleText = title.textContent.toLowerCase();
                
                // Add appropriate icon classes based on forum category
                if (titleText.includes('development') || titleText.includes('programming')) {
                    icon.classList.add('node-icon--development');
                    if (!icon.innerHTML.trim()) {
                        icon.innerHTML = '<i class="fas fa-code"></i>';
                    }
                } else if (titleText.includes('design') || titleText.includes('creative')) {
                    icon.classList.add('node-icon--design');
                    if (!icon.innerHTML.trim()) {
                        icon.innerHTML = '<i class="fas fa-palette"></i>';
                    }
                } else if (titleText.includes('devops') || titleText.includes('infrastructure')) {
                    icon.classList.add('node-icon--devops');
                    if (!icon.innerHTML.trim()) {
                        icon.innerHTML = '<i class="fas fa-server"></i>';
                    }
                } else if (titleText.includes('community') || titleText.includes('general')) {
                    icon.classList.add('node-icon--community');
                    if (!icon.innerHTML.trim()) {
                        icon.innerHTML = '<i class="fas fa-users"></i>';
                    }
                }
            }
        });
    }
    
    function addHoverEffects() {
        // Add smooth hover effects to nodes
        const nodes = document.querySelectorAll('.node');
        
        nodes.forEach(node => {
            node.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            node.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (this.classList.contains('button--cta')) {
                    this.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
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
        
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            this.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        });
        
        document.body.appendChild(toggle);
    }
    
    // Initialize theme toggle (uncomment if needed)
    // addThemeToggle();
    
})();