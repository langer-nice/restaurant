/**
 * Menu Modal Functionality
 * Handles the display and interaction of the PDF menu overlay
 */

class MenuModal {
  constructor() {
    this.modal = document.getElementById('menuModal');
    this.menuButton = document.getElementById('menuButton');
    this.closeButton = document.getElementById('menuCloseBtn');
    this.pdfContainer = document.querySelector('.pdf-container');
    this.pdfFrame = document.querySelector('.menu-pdf');
    
    this.init();
  }

  init() {
    if (!this.modal || !this.menuButton) return;
    
    this.setupEventListeners();
    this.setupAccessibility();
  }

  setupEventListeners() {
    // Open modal when menu button is clicked
    this.menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
    });

    // Close modal when close button is clicked
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.closeModal();
      });
    }

    // Close modal when clicking outside the content
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Handle PDF loading states
    if (this.pdfFrame) {
      this.pdfFrame.addEventListener('load', () => {
        this.onPdfLoad();
      });

      this.pdfFrame.addEventListener('error', () => {
        this.onPdfError();
      });
    }
  }

  setupAccessibility() {
    // Set ARIA attributes
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'menuModalTitle');
    
    // Add aria-label to close button
    if (this.closeButton) {
      this.closeButton.setAttribute('aria-label', 'Close menu modal');
    }
  }

  openModal() {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Show modal with display first
    this.modal.style.display = 'flex';
    
    // Force a reflow to ensure display is applied
    this.modal.offsetHeight;
    
    // Add active class for animation
    this.modal.classList.add('active');
    
    // Focus management
    this.trapFocus();
    
    // Focus the close button for keyboard users
    setTimeout(() => {
      if (this.closeButton) {
        this.closeButton.focus();
      }
    }, 100);

    // Add loading indicator
    this.showLoading();
  }

  closeModal() {
    // Add closing class for animation
    this.modal.classList.add('closing');
    this.modal.classList.remove('active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.modal.style.display = 'none';
      this.modal.classList.remove('closing');
      
      // Restore body scrolling
      document.body.style.overflow = '';
      
      // Return focus to menu button
      this.menuButton.focus();
      
      // Remove loading indicator
      this.hideLoading();
    }, 300);
  }

  showLoading() {
    if (this.pdfContainer && !this.pdfContainer.querySelector('.menu-pdf-loading')) {
      const loadingEl = document.createElement('div');
      loadingEl.className = 'menu-pdf-loading';
      loadingEl.textContent = 'Loading menu...';
      this.pdfContainer.appendChild(loadingEl);
    }
  }

  hideLoading() {
    const loadingEl = this.pdfContainer?.querySelector('.menu-pdf-loading');
    if (loadingEl) {
      loadingEl.remove();
    }
  }

  onPdfLoad() {
    this.hideLoading();
    console.log('Menu PDF loaded successfully');
  }

  onPdfError() {
    this.hideLoading();
    console.warn('Failed to load menu PDF');
    
    // Show fallback message more prominently
    const fallback = document.querySelector('.menu-fallback');
    if (fallback) {
      fallback.style.display = 'block';
      fallback.style.padding = '40px 20px';
      fallback.style.background = '#fff3cd';
      fallback.style.border = '1px solid #ffeaa7';
    }
  }

  trapFocus() {
    // Get all focusable elements within the modal
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Remove any existing focus trap listeners
    this.modal.removeEventListener('keydown', this.handleFocusTrap);
    
    // Add focus trap
    this.handleFocusTrap = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab: moving backward
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: moving forward
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    this.modal.addEventListener('keydown', this.handleFocusTrap);
  }
}

// Initialize the menu modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MenuModal();
});

// Handle dynamic content changes
if (typeof window.initMenuModal === 'undefined') {
  window.initMenuModal = () => new MenuModal();
}
