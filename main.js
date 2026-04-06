// Travel Packages Website - Simple JavaScript with Formspree
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

  // Contact Form with Formspree - Custom Confirmation
  setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent Formspree redirect
        
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('successMessage');
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        
        try {
          // Submit to Formspree via fetch
          const response = await fetch('https://formspree.io/f/maqlaone', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            // Show custom success message
            if (successMessage) {
              successMessage.classList.add('show');
            }
            
            // Reset form
            form.reset();
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            
            // Hide success message after 10 seconds
            setTimeout(() => {
              if (successMessage) {
                successMessage.classList.remove('show');
              }
            }, 10000);
            
            this.showNotification('Message sent successfully! We\'ll contact you soon.');
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          submitButton.textContent = 'Send Message';
          submitButton.disabled = false;
          this.showNotification('Oops! Something went wrong. Please try again.');
        }
      });
    }
  }

  // FAQ Accordion
  setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          
          // Close all FAQ items
          faqItems.forEach(faqItem => {
            faqItem.classList.remove('open');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            if (faqAnswer) {
              faqAnswer.style.maxHeight = '0';
            }
          });
          
          // Open clicked item if it wasn't open
          if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // Destinations Search
  setupDestinationsSearch() {
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    if (!searchInput || !regionFilter) return;
    
    const filterDestinations = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedRegion = regionFilter.value;
      
      destinationCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const region = card.dataset.region;
        
        const matchesSearch = name.includes(searchTerm);
        const matchesRegion = selectedRegion === 'all' || region === selectedRegion;
        
        if (matchesSearch && matchesRegion) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };
    
    searchInput.addEventListener('input', filterDestinations);
    regionFilter.addEventListener('change', filterDestinations);
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

    // Observe package cards and destination cards
    const animatedElements = document.querySelectorAll('.package, .destination-card');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Notification system
  showNotification(message) {
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
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize the website
const travelSite = new TravelWebsite();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .hidden {
    display: none !important;
  }
`;
document.head.appendChild(style);
