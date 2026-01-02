// Shared contact constants - Single source of truth for all contact information

export const PHONE_NUMBER = "+91 98765 43210";
export const WHATSAPP_NUMBER = "+91 98765 43210";
export const EMAIL_ADDRESS = "hello@quicklaunch.com";
export const COMPANY_NAME = "Quick Launch";
export const COMPANY_TAGLINE = "Empowering brands through creative solutions. From web development to branding, we deliver innovative strategies that elevate your brand.";

// Default message template for WhatsApp and Email
export const DEFAULT_MESSAGE = `Hello ${COMPANY_NAME}! I'm interested in your services. Please get back to me.`;

// Helper function to generate WhatsApp URL with prefilled message
export function getWhatsAppUrl(message?: string): string {
  const msg = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}?text=${msg}`;
}

// Helper function to generate Email mailto URL with prefilled subject and body
export function getEmailUrl(subject?: string, body?: string): string {
  const subj = encodeURIComponent(subject || `Inquiry from ${COMPANY_NAME} Website`);
  const msg = encodeURIComponent(body || DEFAULT_MESSAGE);
  return `mailto:${EMAIL_ADDRESS}?subject=${subj}&body=${msg}`;
}

// Helper function to generate phone call URL
export function getPhoneUrl(): string {
  return `tel:${PHONE_NUMBER.replace(/\s/g, "")}`;
}

