// Simple Contact Navigation Script
console.log('🔗 Contact navigation script loaded');

// Function to scroll to contact section
function scrollToContact() {
    console.log('📍 scrollToContact function called');
    const contactSection = document.getElementById('contact');
    if (!contactSection) {
        console.error('❌ Contact section not found');
        return;
    }
    
    console.log('✅ Contact section found:', contactSection);
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 80;
    const targetPosition = contactSection.offsetTop - navHeight - 20;
    
    console.log('� Nav height:', navHeight, 'Contact offset:', contactSection.offsetTop, 'Target:', targetPosition);
    console.log('�📍 Scrolling to contact section...');
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    console.log('✅ Scroll command executed');
}

// Handle contact links
function setupContactLinks() {
    console.log('🔧 Setting up contact links...');
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    console.log('🔍 Found contact links:', contactLinks.length, contactLinks);
    
    contactLinks.forEach((link, index) => {
        console.log(`🔗 Setting up link ${index}:`, link.href, link);
        link.addEventListener('click', function(e) {
            console.log('🖱️ Contact link clicked!', this.href);
            const href = this.getAttribute('href');
            
            // Same page contact link
            if (href === '#contact') {
                console.log('📍 Same page contact link detected');
                e.preventDefault();
                scrollToContact();
            }
        });
    });
    
    console.log(`✅ Setup ${contactLinks.length} contact links`);
}

// Check for contact hash on page load
function checkContactHash() {
    if (window.location.hash === '#contact') {
        console.log('🎯 Contact hash detected');
        setTimeout(scrollToContact, 300);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupContactLinks();
    checkContactHash();
});

// Handle hash changes
window.addEventListener('hashchange', checkContactHash);

// Handle page load (for cross-page navigation)
window.addEventListener('load', function() {
    setTimeout(checkContactHash, 100);
});

// Global function for testing
window.scrollToContact = scrollToContact;
