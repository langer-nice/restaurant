// Contact Form Handler with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("2I7Ie79vFnJVsa_ai"); // Replace with your EmailJS public key
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || 'Not provided',
                message: data.comments || 'No additional comments',
                to_name: 'Restaurant Team', // Your restaurant name
                reply_to: data.email
            };
            
            emailjs.send('service_f88h9nf', 'template_hvdax0k', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showMessage('Failed to send message. Please try again or contact us directly.', 'error');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Show message function
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message before form
        const formWrapper = document.querySelector('.contact-form-wrapper');
        formWrapper.insertBefore(messageDiv, formWrapper.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
    
    // Enhanced smooth scrolling for contact link
    function initContactNavigation() {
        // Handle all contact links (both #contact and /index.html#contact)
        const contactLinks = document.querySelectorAll('a[href="#contact"], a[href*="#contact"]');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                console.log('Contact link clicked:', href); // Debug log
                
                // Check if we're on the same page or need to navigate
                if (href === '#contact') {
                    // Same page - scroll to contact section
                    e.preventDefault();
                    scrollToContact();
                } else if (href.includes('#contact')) {
                    // Different page - check if we need to navigate
                    const currentPage = window.location.pathname;
                    const targetPage = href.split('#')[0];
                    
                    if (currentPage.includes('index.html') || (currentPage === '/' && targetPage.includes('index.html'))) {
                        // Same page, just scroll
                        e.preventDefault();
                        scrollToContact();
                    } else if (targetPage === '/index.html' || targetPage === '') {
                        // Navigate to index and scroll (let default behavior handle navigation)
                        // The scroll will happen when the page loads
                        return;
                    }
                }
            });
        });
        
        // Check if we need to scroll on page load (for direct #contact links)
        if (window.location.hash === '#contact') {
            setTimeout(() => {
                scrollToContact();
            }, 100); // Small delay to ensure page is loaded
        }
    }
    
    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        console.log('Scrolling to contact section:', contactSection); // Debug log
        
        if (contactSection) {
            // Calculate offset for fixed navigation
            const navHeight = document.querySelector('nav')?.offsetHeight || 80;
            const elementPosition = contactSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn('Contact section not found!');
        }
    }
    
    // Initialize contact navigation
    initContactNavigation();
});
