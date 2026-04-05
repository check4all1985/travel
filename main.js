// Travel Packages Website - Enhanced JavaScript
class TravelWebsite {
  constructor() {
    this.cart = [];
    this.isCartOpen = false;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupCart();
    this.setupPackageFilters();
    this.setupContactForm();
    this.setupAnimations();
    this.setupFAQ();
    this.setupDestinationsSearch();
    this.updateCartUI();
  }

  // Mobile Menu Toggle
  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
      });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.textContent = '☰';
        }
      });
    });
  }

  // Shopping Cart Functionality
  setupCart() {
    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const closeCart = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (cartIcon && cartSidebar) {
      cartIcon.addEventListener('click', () => this.openCart());
    }

    if (closeCart) {
      closeCart.addEventListener('click', () => this.closeCart());
    }

    if (overlay) {
      overlay.addEventListener('click', () => this.closeCart());
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const package = e.target.dataset.package;
        const price = parseInt(e.target.dataset.price);
        this.addToCart(package, price);
      });
    });
  }

  openCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar && overlay) {
      cartSidebar.classList.add('open');
      overlay.classList.add('show');
      this.isCartOpen = true;
    }
  }

  closeCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar && overlay) {
      cartSidebar.classList.remove('open');
      overlay.classList.remove('show');
      this.isCartOpen = false;
    }
  }

  addToCart(packageName, price) {
    const existingItem = this.cart.find(item => item.name === packageName);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        name: packageName,
        price: price,
        quantity: 1
      });
    }
    
    this.updateCartUI();
    this.showNotification(`${packageName} added to cart!`);
  }

  removeFromCart(packageName) {
    this.cart = this.cart.filter(item => item.name !== packageName);
    this.updateCartUI();
  }

  updateQuantity(packageName, change) {
    const item = this.cart.find(item => item.name === packageName);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(packageName);
      } else {
        this.updateCartUI();
      }
    }
  }

  updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartEmpty = document.querySelector('.cart-empty');

    // Update cart count
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = totalItems;
    }

    // Update cart items
    if (cartItems) {
      if (this.cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      } else {
        let html = '';
        this.cart.forEach(item => {
          html += `
            <div class="cart-item">
              <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>£${item.price}</p>
              </div>
              <div class="cart-item-controls">
                <button class="quantity-btn" onclick="travelSite.updateQuantity('${item.name}', -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="travelSite.updateQuantity('${item.name}', 1)">+</button>
                <button class="remove-btn" onclick="travelSite.removeFromCart('${item.name}')">&times;</button>
              </div>
            </div>
          `;
        });
        cartItems.innerHTML = html;
      }
    }

    // Update total
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
      cartTotal.textContent = `Total: £${total.toLocaleString()}`;
    }
  }

  handleCheckout() {
    if (this.cart.length === 0) {
      this.showNotification('Your cart is empty!');
      return;
    }

    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const items = this.cart.map(item => `${item.quantity}x ${item.name}`).join('\n');
    
    if (confirm(`Checkout Summary:\n\n${items}\n\nTotal: £${total.toLocaleString()}\n\nProceed to checkout?`)) {
      this.showNotification('Thank you for your order! We will contact you soon.');
      this.cart = [];
      this.updateCartUI();
      this.closeCart();
    }
  }

  // Package Filtering
  setupPackageFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const packages = document.querySelectorAll('.package');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter packages
        packages.forEach(package => {
          const categories = package.dataset.category;
          
          if (filter === 'all' || categories.includes(filter)) {
            package.classList.remove('hidden');
            package.classList.add('fade-in');
          } else {
            package.classList.add('hidden');
          }
        });
      });
    });
  }

  // Contact Form Enhancement
  setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        this.submitForm(form);
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        const errorElement = document.getElementById(`${input.name}Error`);
        if (errorElement) {
          errorElement.classList.remove('show');
        }
      });
    });
  }

  validateField(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    let isValid = true;

    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
    } else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(field.value);
    } else if (field.name === 'message' && field.value.length < 10) {
      isValid = false;
    }

    if (errorElement) {
      if (!isValid) {
        errorElement.classList.add('show');
      } else {
        errorElement.classList.remove('show');
      }
    }

    return isValid;
  }

  validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  submitForm(form) {
    const successMessage = document.getElementById('successMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      if (successMessage) {
        successMessage.classList.add('show');
      }
      
      form.reset();
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;

      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.remove('show');
        }
      }, 5000);
    }, 1500);
  }

  // Animations
  setupAnimations() {
    // Add fade-in animation to elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe packages and features
    const packages = document.querySelectorAll('.package');
    const features = document.querySelectorAll('.feature');
    
    [...packages, ...features].forEach(element => {
      observer.observe(element);
    });
  }

  // Notifications
  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // FAQ Functionality
  setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        faqQuestions.forEach(q => {
          q.parentElement.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add('active');
        }
      });
    });
  }

  // Destinations Search Functionality
  setupDestinationsSearch() {
    const searchInput = document.getElementById('destinationSearch');
    const regionFilter = document.getElementById('regionFilter');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    if (!searchInput || !regionFilter) return;
    
    const filterDestinations = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedRegion = regionFilter.value;
      
      destinationCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const region = card.dataset.region;
        
        const matchesSearch = name.includes(searchTerm);
        const matchesRegion = !selectedRegion || region === selectedRegion;
        
        if (matchesSearch && matchesRegion) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    };
    
    searchInput.addEventListener('input', filterDestinations);
    regionFilter.addEventListener('change', filterDestinations);
  }
}

// Initialize the website when DOM is loaded
let travelSite;
document.addEventListener('DOMContentLoaded', () => {
  travelSite = new TravelWebsite();
});

// Add cart item styles dynamically
const cartStyles = `
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .cart-item:last-child {
    border-bottom: none;
  }
  
  .cart-item-details h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem;
    color: var(--text-primary);
  }
  
  .cart-item-details p {
    margin: 0;
    font-weight: 600;
    color: var(--primary-color);
  }
  
  .cart-item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .quantity-btn {
    width: 24px;
    height: 24px;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .quantity-btn:hover {
    background: var(--bg-tertiary);
  }
  
  .quantity {
    min-width: 20px;
    text-align: center;
    font-weight: 600;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    margin-left: 0.5rem;
  }
  
  .remove-btn:hover {
    color: #dc2626;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);
