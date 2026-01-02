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
const modalTitle = document.getElementById('modalTitle');
const formView = document.getElementById('formView');
const ctaOptionsView = document.getElementById('ctaOptionsView');
const whatsappCTA = document.getElementById('whatsappCTA') as HTMLAnchorElement | null;
const emailCTA = document.getElementById('emailCTA') as HTMLAnchorElement | null;
const closeModalBtn = document.getElementById('closeModalBtn');

// Constants from contact.ts (will be imported via script define:vars)
const EMAIL_ADDRESS = 'hello@quicklaunch.com';
const WHATSAPP_NUMBER = '+919876543210';

// Helper function to generate WhatsApp URL
function getWhatsAppUrl(message: string): string {
    const msg = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}?text=${msg}`;
}

// Helper function to generate Email URL
function getEmailUrl(subject: string, body: string): string {
    const subj = encodeURIComponent(subject);
    const msg = encodeURIComponent(body);
    return `mailto:${EMAIL_ADDRESS}?subject=${subj}&body=${msg}`;
}

// Open modal when clicking on industry cards
const industryCards = document.querySelectorAll('.industry-card');
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

// Handle Book Now buttons that should open modal (for Quick Launch card)
document.querySelectorAll('[data-open-modal]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.getAttribute('data-category') || 'Quick Launch';
        openBookingModal(category);
    });
});

function openBookingModal(category: string): void {
    if (selectedCategoryInput) {
        selectedCategoryInput.value = category;
    }
    if (modalTitle) {
        modalTitle.textContent = `Book Website for ${category}`;
    }
    
    // Reset modal to form view
    if (formView) formView.classList.remove('hidden');
    if (ctaOptionsView) ctaOptionsView.classList.add('hidden');
    if (bookingForm) bookingForm.reset();
    
    if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal(): void {
    if (bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (bookingForm) {
        bookingForm.reset();
    }
    // Reset to form view
    if (formView) formView.classList.remove('hidden');
    if (ctaOptionsView) ctaOptionsView.classList.add('hidden');
}

// Close modal when clicking close button
if (closeModal) {
    closeModal.addEventListener('click', closeBookingModal);
}

// Close modal button in CTA options
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBookingModal);
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
        const messageInput = document.getElementById('userMessage') as HTMLTextAreaElement | null;
        
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const phone = phoneInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';
        const category = selectedCategoryInput?.value || '';

        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Generate WhatsApp message
        const whatsappMessage = `Hi, I want to book a website for ${category}.\nName: ${name}\nPhone: ${phone}\nEmail: ${email}${message ? `\n\nMessage: ${message}` : ''}`;
        const whatsappUrl = getWhatsAppUrl(whatsappMessage);
        
        // Generate Email subject and body
        const emailSubject = `Website Booking – ${category}`;
        const emailBody = `Hello,\n\nI would like to book a website for ${category}.\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}${message ? `\n\nMessage:\n${message}` : ''}\n\nPlease contact me to proceed with the booking.\n\nThank you!`;
        const emailUrl = getEmailUrl(emailSubject, emailBody);
        
        // Update CTA links
        if (whatsappCTA) {
            whatsappCTA.href = whatsappUrl;
        }
        if (emailCTA) {
            emailCTA.href = emailUrl;
        }
        
        // Hide form, show CTA options
        if (formView) formView.classList.add('hidden');
        if (ctaOptionsView) ctaOptionsView.classList.remove('hidden');
    });
}

