// Main TypeScript file for client-side interactivity

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 2 hours.');
        (e.target as HTMLFormElement).reset();
    });
}

// Booking Modal Functionality
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm') as HTMLFormElement | null;
const selectedCategoryInput = document.getElementById('selectedCategory') as HTMLInputElement | null;
const industryCards = document.querySelectorAll('.industry-card');

// Open modal when clicking on industry cards
industryCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open if clicking directly on the button (let button handle it)
        if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
            const category = card.getAttribute('data-category');
            if (category) {
                openBookingModal(category);
            }
        }
    });
});

// Also handle button clicks directly
industryCards.forEach(card => {
    const button = card.querySelector('button');
    if (button) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = card.getAttribute('data-category');
            if (category) {
                openBookingModal(category);
            }
        });
    }
});

function openBookingModal(category: string): void {
    if (selectedCategoryInput) {
        selectedCategoryInput.value = category;
    }
    if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeBookingModal(): void {
    if (bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    if (bookingForm) {
        bookingForm.reset();
    }
}

// Close modal when clicking close button
if (closeModal) {
    closeModal.addEventListener('click', closeBookingModal);
}

// Close modal when clicking outside
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
        closeBookingModal();
    }
});

// Handle booking form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('userName') as HTMLInputElement | null;
        const emailInput = document.getElementById('userEmail') as HTMLInputElement | null;
        const phoneInput = document.getElementById('userPhone') as HTMLInputElement | null;
        
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const phone = phoneInput?.value.trim() || '';
        const category = selectedCategoryInput?.value || '';

        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create email subject and body
        const subject = encodeURIComponent(`Book ${category} Website`);
        const body = encodeURIComponent(
            `Hello,\n\nI would like to book a website for ${category} category.\n\n` +
            `Details:\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Category: ${category}\n\n` +
            `Please contact me to proceed with the booking.\n\n` +
            `Thank you!`
        );

        // Create mailto link
        const mailtoLink = `mailto:harishchoure312@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Close modal after a short delay
        setTimeout(() => {
            closeBookingModal();
        }, 500);
    });
}

