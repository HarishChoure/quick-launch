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

// Store original category for form submission
let currentCategory = '';

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

// Map category to industry-specific display text
function getIndustryDisplayText(category: string): string {
    const industryMap: { [key: string]: string } = {
        'HVAC': 'HVAC Website',
        'Plumbing': 'Plumbing Website',
        'Law Firm': 'Law Firm Website',
        'Lawn Care': 'Lawn Care Website',
        'Dental': 'Dental Practice Website',
        'Restaurant': 'Restaurant Website',
        'Auto Repair': 'Auto Repair Website',
        'Salon & Spa': 'Salon & Spa Website',
        'Quick Launch': 'Quick Launch Website',
        'Others': 'Custom Website'
    };
    return industryMap[category] || `${category} Website`;
}

function openBookingModal(category: string): void {
    // Store original category for form submission
    currentCategory = category;
    const industryDisplayText = getIndustryDisplayText(category);
    
    if (selectedCategoryInput) {
        selectedCategoryInput.value = industryDisplayText;
    }
    if (modalTitle) {
        modalTitle.textContent = `Book Website for ${category}`;
    }
    
    // Update step indicator
    const stepIndicator = document.getElementById('stepIndicator');
    if (stepIndicator) {
        stepIndicator.textContent = 'Step 1 of 2';
    }
    
    // Reset modal to form view
    if (formView) formView.classList.remove('hidden');
    if (ctaOptionsView) ctaOptionsView.classList.add('hidden');
    if (bookingForm) bookingForm.reset();
    
    // Set the industry field again after reset
    if (selectedCategoryInput) {
        selectedCategoryInput.value = industryDisplayText;
    }
    
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
        // Use stored original category or fallback to input value
        const category = currentCategory || selectedCategoryInput?.value || '';

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
        if (ctaOptionsView) {
            ctaOptionsView.classList.remove('hidden');
            // Update step indicator in CTA view
            const stepIndicator = document.getElementById('stepIndicator');
            if (stepIndicator) {
                stepIndicator.textContent = 'Step 2 of 2';
            }
        }
    });
}

// Hire Team Modal Functionality
const hireTeamModal = document.getElementById('hireTeamModal');
const closeHireModal = document.getElementById('closeHireModal');
const hireTeamForm = document.getElementById('hireTeamForm') as HTMLFormElement | null;
const selectedRoleInput = document.getElementById('selectedRole') as HTMLInputElement | null;
const hireModalTitle = document.getElementById('hireModalTitle');
const hireFormView = document.getElementById('hireFormView');
const hireCtaOptionsView = document.getElementById('hireCtaOptionsView');
const hireWhatsappCTA = document.getElementById('hireWhatsappCTA') as HTMLAnchorElement | null;
const hireEmailCTA = document.getElementById('hireEmailCTA') as HTMLAnchorElement | null;
const closeHireModalBtn = document.getElementById('closeHireModalBtn');

// Store original role and rate for form submission
let currentHireRole = '';
let currentHireRate = '';

// Helper function to get role display text
function getRoleDisplayText(role: string, rate: string): string {
    return `${role} (${rate})`;
}

// Open hire modal when clicking hire buttons
document.querySelectorAll('[data-hire-role]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const role = button.getAttribute('data-hire-role') || '';
        const rate = button.getAttribute('data-hire-rate') || '';
        if (role && rate) {
            openHireModal(role, rate);
        }
    });
});

function openHireModal(role: string, rate: string): void {
    // Store original role and rate for form submission
    currentHireRole = role;
    currentHireRate = rate;
    const roleDisplayText = getRoleDisplayText(role, rate);
    
    if (selectedRoleInput) {
        selectedRoleInput.value = roleDisplayText;
    }
    if (hireModalTitle) {
        hireModalTitle.textContent = `Hire ${role}`;
    }
    
    // Update step indicator
    const hireStepIndicator = document.getElementById('hireStepIndicator');
    if (hireStepIndicator) {
        hireStepIndicator.textContent = 'Step 1 of 2';
    }
    
    // Reset modal to form view
    if (hireFormView) hireFormView.classList.remove('hidden');
    if (hireCtaOptionsView) hireCtaOptionsView.classList.add('hidden');
    if (hireTeamForm) hireTeamForm.reset();
    
    // Set the role field again after reset
    if (selectedRoleInput) {
        selectedRoleInput.value = roleDisplayText;
    }
    
    if (hireTeamModal) {
        hireTeamModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeHireModalFunction(): void {
    if (hireTeamModal) {
        hireTeamModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (hireTeamForm) {
        hireTeamForm.reset();
    }
    // Reset to form view
    if (hireFormView) hireFormView.classList.remove('hidden');
    if (hireCtaOptionsView) hireCtaOptionsView.classList.add('hidden');
}

// Close modal when clicking close button
if (closeHireModal) {
    closeHireModal.addEventListener('click', closeHireModalFunction);
}

// Close modal button in CTA options
if (closeHireModalBtn) {
    closeHireModalBtn.addEventListener('click', closeHireModalFunction);
}

// Close modal when clicking outside
if (hireTeamModal) {
    hireTeamModal.addEventListener('click', (e) => {
        if (e.target === hireTeamModal) {
            closeHireModalFunction();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hireTeamModal && hireTeamModal.classList.contains('active')) {
        closeHireModalFunction();
    }
});

// Handle hire form submission
if (hireTeamForm) {
    hireTeamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('hireUserName') as HTMLInputElement | null;
        const emailInput = document.getElementById('hireUserEmail') as HTMLInputElement | null;
        const phoneInput = document.getElementById('hireUserPhone') as HTMLInputElement | null;
        const projectDetailsInput = document.getElementById('hireProjectDetails') as HTMLTextAreaElement | null;
        const durationInput = document.getElementById('hireDuration') as HTMLSelectElement | null;
        const budgetInput = document.getElementById('hireBudget') as HTMLSelectElement | null;
        const messageInput = document.getElementById('hireUserMessage') as HTMLTextAreaElement | null;
        
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const phone = phoneInput?.value.trim() || '';
        const projectDetails = projectDetailsInput?.value.trim() || '';
        const duration = durationInput?.value || '';
        const budget = budgetInput?.value || '';
        const message = messageInput?.value.trim() || '';
        const role = currentHireRole || selectedRoleInput?.value || '';
        const rate = currentHireRate || '';

        if (!name || !email || !phone || !projectDetails || !duration) {
            alert('Please fill in all required fields.');
            return;
        }

        // Format duration text
        const durationText = durationInput?.selectedOptions[0]?.text || duration;
        const budgetText = budget ? (budgetInput?.selectedOptions[0]?.text || budget) : 'Not specified';

        // Generate WhatsApp message
        const whatsappMessage = `Hi, I want to hire a ${role} (${rate}).\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nHours/Duration: ${durationText}${budget ? `\nBudget: ${budgetText}` : ''}\n\nProject Details:\n${projectDetails}${message ? `\n\nAdditional Message:\n${message}` : ''}`;
        const whatsappUrl = getWhatsAppUrl(whatsappMessage);
        
        // Generate Email subject and body
        const emailSubject = `Hire ${role} - ${rate}`;
        const emailBody = `Hello,\n\nI would like to hire a ${role} (${rate}).\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nHours/Duration: ${durationText}${budget ? `\nBudget: ${budgetText}` : ''}\n\nProject Details:\n${projectDetails}${message ? `\n\nAdditional Message:\n${message}` : ''}\n\nPlease contact me to proceed with the hiring process.\n\nThank you!`;
        const emailUrl = getEmailUrl(emailSubject, emailBody);
        
        // Update CTA links
        if (hireWhatsappCTA) {
            hireWhatsappCTA.href = whatsappUrl;
        }
        if (hireEmailCTA) {
            hireEmailCTA.href = emailUrl;
        }
        
        // Hide form, show CTA options
        if (hireFormView) hireFormView.classList.add('hidden');
        if (hireCtaOptionsView) {
            hireCtaOptionsView.classList.remove('hidden');
            // Update step indicator in CTA view
            const hireStepIndicator = document.getElementById('hireStepIndicator');
            if (hireStepIndicator) {
                hireStepIndicator.textContent = 'Step 2 of 2';
            }
        }
    });
}

