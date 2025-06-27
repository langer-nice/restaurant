/**
 * Testimonial Carousel Functionality
 * Handles horizontal scrolling and navigation for testimonials on mobile devices
 */

class TestimonialCarousel {
  constructor() {
    this.grid = document.querySelector('.testimonials-grid');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.prevBtn = document.getElementById('testimonial-prev');
    this.nextBtn = document.getElementById('testimonial-next');
    this.dots = document.querySelectorAll('.carousel-dot');
    this.currentSlide = 0;
    
    if (!this.grid || this.cards.length === 0) return;
    
    this.init();
  }
  
  init() {
    // Only initialize on mobile
    if (window.innerWidth <= 768) {
      console.log('Initializing testimonial carousel for mobile');
      this.setupEventListeners();
      this.updateNavigation();
    }
    
    // Re-initialize on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        console.log('Re-initializing carousel on resize');
        this.setupEventListeners();
        this.updateNavigation();
      }
    });
  }
  
  setupEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Dot indicators
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Touch/swipe support
    this.setupTouchEvents();
    
    // Scroll event to update active dot
    this.grid.addEventListener('scroll', () => {
      this.updateCurrentSlide();
    });
  }
  
  setupTouchEvents() {
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let isDown = false;
    let hasMoved = false;
    const threshold = 50; // Minimum swipe distance
    
    // Touch events
    this.grid.addEventListener('touchstart', (e) => {
      isDown = true;
      hasMoved = false;
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      scrollLeft = this.grid.scrollLeft;
      this.grid.style.scrollBehavior = 'auto';
    }, { passive: true });
    
    this.grid.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      
      const currentX = e.touches[0].pageX;
      const currentY = e.touches[0].pageY;
      const deltaX = startX - currentX;
      const deltaY = startY - currentY;
      
      // Only prevent default if this is more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        hasMoved = true;
        this.grid.scrollLeft = scrollLeft + deltaX;
      }
    }, { passive: false });
    
    this.grid.addEventListener('touchend', (e) => {
      if (!isDown) return;
      isDown = false;
      
      const endX = e.changedTouches[0].pageX;
      const deltaX = startX - endX;
      
      this.grid.style.scrollBehavior = 'smooth';
      
      // Only handle swipe if there was significant movement
      if (hasMoved && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && this.currentSlide < this.cards.length - 1) {
          // Swiped left - next slide
          this.nextSlide();
        } else if (deltaX < 0 && this.currentSlide > 0) {
          // Swiped right - previous slide
          this.previousSlide();
        } else {
          // Snap back to current slide
          this.snapToNearestCard();
        }
      } else {
        // No significant swipe, snap to nearest card
        this.snapToNearestCard();
      }
    }, { passive: true });
    
    // Mouse events for desktop testing
    this.grid.addEventListener('mousedown', (e) => {
      isDown = true;
      hasMoved = false;
      startX = e.pageX;
      scrollLeft = this.grid.scrollLeft;
      this.grid.style.scrollBehavior = 'auto';
      this.grid.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    this.grid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      hasMoved = true;
      const deltaX = e.pageX - startX;
      this.grid.scrollLeft = scrollLeft - deltaX;
    });
    
    this.grid.addEventListener('mouseup', (e) => {
      if (!isDown) return;
      isDown = false;
      
      const endX = e.pageX;
      const deltaX = startX - endX;
      
      this.grid.style.scrollBehavior = 'smooth';
      this.grid.style.cursor = 'grab';
      
      if (hasMoved && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && this.currentSlide < this.cards.length - 1) {
          this.nextSlide();
        } else if (deltaX < 0 && this.currentSlide > 0) {
          this.previousSlide();
        } else {
          this.snapToNearestCard();
        }
      } else {
        this.snapToNearestCard();
      }
    });
    
    this.grid.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        this.grid.style.scrollBehavior = 'smooth';
        this.grid.style.cursor = 'grab';
        this.snapToNearestCard();
      }
    });
  }
  
  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.scrollToSlide(this.currentSlide);
    }
  }
  
  nextSlide() {
    if (this.currentSlide < this.cards.length - 1) {
      this.currentSlide++;
      this.scrollToSlide(this.currentSlide);
    }
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.scrollToSlide(index);
  }
  
  scrollToSlide(index) {
    const card = this.cards[index];
    if (card && window.innerWidth <= 768) {
      // For mobile carousel, scroll to show the card centered
      const cardWidth = 280; // As defined in CSS
      const gap = 20; // Gap between cards
      const containerPadding = 20; // Padding on left
      
      const scrollPosition = (index * (cardWidth + gap)) + containerPadding - (gap / 2);
      
      this.grid.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
    
    this.updateNavigation();
  }
  
  updateCurrentSlide() {
    if (window.innerWidth > 768) return;
    
    // Calculate current slide based on scroll position
    const cardWidth = 280;
    const gap = 20;
    const scrollLeft = this.grid.scrollLeft;
    
    // Calculate which card is most centered
    const slideIndex = Math.round(scrollLeft / (cardWidth + gap));
    const newSlide = Math.max(0, Math.min(slideIndex, this.cards.length - 1));
    
    if (newSlide !== this.currentSlide) {
      this.currentSlide = newSlide;
      this.updateNavigation();
    }
  }
  
  snapToNearestCard() {
    this.updateCurrentSlide();
    this.scrollToSlide(this.currentSlide);
  }
  
  updateNavigation() {
    // Update navigation buttons
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentSlide === 0;
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentSlide === this.cards.length - 1;
    }
    
    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
});

// Re-initialize on dynamic content changes
if (typeof window.initTestimonialCarousel === 'undefined') {
  window.initTestimonialCarousel = () => new TestimonialCarousel();
}
