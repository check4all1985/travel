// Modal functionality
function openBookingModal(packageName) {
    document.getElementById('booking-modal').style.display = 'block';
    document.getElementById('package-name').value = packageName;
}

function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('booking-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Package filtering
document.getElementById('destination-filter').addEventListener('change', function() {
    const filterValue = this.value;
    const packages = document.querySelectorAll('.package-card');

    packages.forEach(package => {
        if (filterValue === 'all' || package.getAttribute('data-destination') === filterValue) {
            package.style.display = 'block';
        } else {
            package.style.display = 'none';
        }
    });
});

// Form handling (since it's static, we'll just show an alert)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you shortly to confirm details.');
    closeBookingModal();
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});