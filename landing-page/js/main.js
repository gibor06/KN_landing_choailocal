// ===== Smooth Scroll for Navigation Links =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for all anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or modal trigger
            if (href === '#' || this.hasAttribute('data-bs-toggle')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: true
                        });
                    }
                }
            }
        });
    });
    
    // ===== Active Menu on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== Back to Top Button =====
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== Reveal on Scroll Animation =====
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // ===== Counter Animation for Metrics =====
    function animateCounter(element, target, duration = 1000, suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('vi-VN') + suffix;
            }
        }
        
        updateCounter();
    }
    
    // Trigger counter animation when metrics section is visible
    const metricsSection = document.querySelector('#seller');
    
    if (metricsSection) {
        let animated = false;
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    
                    const totalProducts = document.getElementById('totalProducts');
                    const todayOrders = document.getElementById('todayOrders');
                    const todayRevenue = document.getElementById('todayRevenue');
                    const lowStock = document.getElementById('lowStock');
                    
                    if (totalProducts) animateCounter(totalProducts, 32);
                    if (todayOrders) animateCounter(todayOrders, 7);
                    if (todayRevenue) animateCounter(todayRevenue, 682000, 1000, 'đ');
                    if (lowStock) animateCounter(lowStock, 4);
                }
            });
        }, observerOptions);
        
        observer.observe(metricsSection);
    }
    
    // ===== Order Button Loading State =====
    const orderButtons = document.querySelectorAll('[data-bs-target="#orderModal"]');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-hourglass-split"></i> Đang tạo đơn...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 500);
        });
    });
    
    console.log('Chợ AI Local - Landing Page Loaded Successfully!');
});
