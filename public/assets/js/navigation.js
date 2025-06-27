// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const langSelected = document.getElementById('langSelected');
    const langOptions = document.getElementById('langOptions');
    
    // Hamburger menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger
            hamburger.classList.toggle('active');
            // Toggle active class on nav menu
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link (mobile)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only close mobile menu if it's actually open (mobile view)
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                // Don't prevent default behavior - let links work normally
            });
        });
    }
    
    // Language dropdown functionality
    if (langSelected && langOptions) {
        langSelected.addEventListener('click', function(e) {
            e.stopPropagation();
            langSelected.classList.toggle('active');
            langOptions.classList.toggle('active');
        });
        
        // Handle language option selection
        const langOptionElements = langOptions.querySelectorAll('.lang-option');
        langOptionElements.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                const flagSrc = this.getAttribute('data-flag');
                
                // Update selected language display
                const selectedLangSpan = langSelected.querySelector('.selected-lang');
                selectedLangSpan.textContent = lang.toUpperCase();
                
                // Update selected flag
                const selectedFlag = document.getElementById('selectedFlag');
                if (selectedFlag && flagSrc) {
                    selectedFlag.src = flagSrc;
                }
                
                // Update active state
                langOptionElements.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Close dropdown
                langSelected.classList.remove('active');
                langOptions.classList.remove('active');
                
                // Change language by updating URL
                const url = new URL(window.location.href);
                url.searchParams.set('lang', lang);
                window.location.href = url.toString();
            });
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // Close nav menu
        if (hamburger && navMenu) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
        
        // Close language dropdown
        if (langSelected && langOptions) {
            const isClickInsideLang = langSelected.contains(event.target) || langOptions.contains(event.target);
            if (!isClickInsideLang) {
                langSelected.classList.remove('active');
                langOptions.classList.remove('active');
            }
        }
    });
    
    // Close menus on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close nav menu
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Close language dropdown
            if (langSelected && langOptions && langOptions.classList.contains('active')) {
                langSelected.classList.remove('active');
                langOptions.classList.remove('active');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove active classes on desktop
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});
