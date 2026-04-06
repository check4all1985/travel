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
  
  if (form) {
    // Simple Formspree handling
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      const successMessage = document.getElementById('successMessage');
      
      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Submit form to Formspree
      setTimeout(() => {
        // Show success message
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
    } else if (field.name === 'postcode' && field.value) {
      // Basic UK postcode validation
      const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i;
      isValid = postcodeRegex.test(field.value);
    }

    if (errorElement) {
      if (!isValid) {
        errorElement.classList.add('show');
        if (field.name === 'address') {
          errorElement.textContent = 'Please enter your street address';
        } else if (field.name === 'city') {
          errorElement.textContent = 'Please enter your city';
        } else if (field.name === 'postcode') {
          errorElement.textContent = 'Please enter a valid postcode (e.g., SW1A 0AA)';
        }
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

    // Collect form data
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      city: form.city.value,
      postcode: form.postcode.value,
      subject: form.subject.value,
      message: form.message.value,
      timestamp: new Date().toISOString(),
      to_email: 'casagleam1985@gmail.com' // Your email address
    };

    // Create formatted contact information
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.postcode}`;
    
    // Show success message immediately
    if (successMessage) {
      successMessage.classList.add('show');
    }
    
    // Reset form
    form.reset();
    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;

    // Send email in background
    this.sendEmail(formData, fullAddress)
      .then(response => {
        console.log('Email sent:', response);
        this.showNotification('Message sent successfully! We\'ll contact you soon.');
      })
      .catch(error => {
        console.error('Email sending failed:', error);
        this.showNotification('Email service unavailable. Please copy the contact information.');
      });

    // Hide success message after 10 seconds
    setTimeout(() => {
      if (successMessage) {
        successMessage.classList.remove('show');
      }
    }, 10000);
  }

  sendEmail(formData, fullAddress) {
    return new Promise((resolve, reject) => {
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        console.log('EmailJS not available, using mailto fallback');
        this.useMailtoFallback(formData, fullAddress, resolve);
        return;
      }

      // EmailJS configuration
      const templateParams = {
        to_name: 'Travel Packages Team',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Not provided',
        from_address: fullAddress,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date(formData.timestamp).toLocaleString()
      };

      // Send email using EmailJS
      emailjs.send('service_tf116od', 'template_isit39m', templateParams)
        .then(function(response) {
          console.log('EmailJS SUCCESS!', response.status, response.text);
          resolve({ success: true, response: response });
        }, function(error) {
          console.log('EmailJS FAILED, using fallback...', error);
          // Fallback to mailto link
          this.useMailtoFallback(formData, fullAddress, resolve);
        }.bind(this));
    });
  }

  useMailtoFallback(formData, fullAddress, resolve) {
    const emailSubject = encodeURIComponent(`New Travel Inquiry: ${formData.subject}`);
    const emailBody = encodeURIComponent(`
NEW TRAVEL INQUIRY - Travel Packages Website

====================
CLIENT INFORMATION
====================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Address: ${fullAddress}

====================
INQUIRY DETAILS
====================
Subject: ${formData.subject}
Message: ${formData.message}

====================
SUBMISSION DETAILS
====================
Submitted: ${new Date(formData.timestamp).toLocaleString()}
Website: https://check4all1985.github.io/travel

====================
ACTION REQUIRED
====================
Please contact this client within 24 hours regarding their travel inquiry.
    `.trim());

    const mailtoLink = `mailto:casagleam1985@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      resolve({ success: true, method: 'mailto' });
    }, 2000);
  }

  generateEmailContent(data, fullAddress) {
    return `
NEW CONTACT INQUIRY - Travel Packages

====================
CLIENT INFORMATION
====================
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Address: ${fullAddress}

====================
INQUIRY DETAILS
====================
Subject: ${data.subject}
Message: ${data.message}
Submitted: ${new Date(data.timestamp).toLocaleString()}

====================
QUICK REPLY OPTIONS
====================
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Address: ${fullAddress}

====================
NEXT STEPS
====================
1. Contact client within 24 hours
2. Check their inquiry subject: ${data.subject}
3. Review their message for specific requirements
4. Prepare relevant package information
    `.trim();
  }

  displayContactInfo(data, fullAddress, emailContent) {
    // Create a modal or display area with contact information
    const contactModal = document.createElement('div');
    contactModal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      z-index: 10001;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
    `;

    contactModal.innerHTML = `
      <h3 style="margin: 0 0 1rem 0; color: var(--text-primary);">Client Contact Information</h3>
      
      <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">Quick Contact Details</h4>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Address:</strong> ${fullAddress}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
      </div>
      
      <div style="margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">Message:</h4>
        <p style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; margin: 0;">${data.message}</p>
      </div>
      
      <div style="margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">Email Template (Click to Copy)</h4>
        <textarea readonly style="width: 100%; height: 200px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-family: monospace; font-size: 0.8rem;">${emailContent}</textarea>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button id="copyEmailBtn" style="background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Copy Email</button>
        <button id="closeModalBtn" style="background: var(--bg-tertiary); color: var(--text-primary); border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Close</button>
      </div>
    `;

    document.body.appendChild(contactModal);

    // Add copy functionality
    document.getElementById('copyEmailBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(emailContent).then(() => {
        this.showNotification('Email content copied to clipboard!');
      });
    });

    // Add close functionality
    document.getElementById('closeModalBtn').addEventListener('click', () => {
      document.body.removeChild(contactModal);
    });

    // Auto-close after 30 seconds
    setTimeout(() => {
      if (document.body.contains(contactModal)) {
        document.body.removeChild(contactModal);
      }
    }, 30000);
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
