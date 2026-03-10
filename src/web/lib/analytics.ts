/**
 * Google Analytics 4 (GA4) Configuration and Tracking Utilities
 * 
 * HOW TO SET UP:
 * 1. Go to https://analytics.google.com/
 * 2. Create a new GA4 property or use existing one
 * 3. Go to Admin > Data Streams > Add Stream > Web
 * 4. Copy your Measurement ID (starts with 'G-')
 * 5. Replace 'G-XXXXXXXXXX' below with your actual ID
 * 
 * For more info: https://support.google.com/analytics/answer/9304153
 */

// Replace this with your actual Google Analytics 4 Measurement ID
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Initialize Google Analytics
 * Call this once when the app loads
 */
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Don't initialize if ID is not set
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('[Analytics] GA4 Measurement ID not configured. Replace G-XXXXXXXXXX with your actual ID.');
    return;
  }

  // Create script element for gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });
};

/**
 * Track page views (called automatically by Analytics component)
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Generic event tracking function
 * 
 * @param category - Event category (e.g., 'Sistemas', 'Contato', 'Lead')
 * @param action - Event action (e.g., 'click_saiba_mais', 'submit_form')
 * @param label - Event label (e.g., 'SalesMasters', 'WhatsApp')
 * @param value - Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    // Store locally even if GA isn't configured
    storeLocalEvent(category, action, label, value);
    return;
  }

  // Send to Google Analytics
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });

  // Also store locally for dashboard
  storeLocalEvent(category, action, label, value);

  // Push to dataLayer for advanced tracking
  window.dataLayer.push({
    event: action,
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  });
};

/**
 * Pre-configured tracking functions for common events
 */

// Track clicks on "SAIBA MAIS" buttons for systems
export const trackSaibaMaisClick = (systemName: string) => {
  trackEvent('Sistemas', 'click_saiba_mais', systemName);
};

// Track WhatsApp button clicks
export const trackWhatsAppClick = (pageName: string) => {
  trackEvent('Contato', 'click_whatsapp', pageName);
};

// Track contact form submissions
export const trackFormSubmit = (interestType?: string) => {
  trackEvent('Lead', 'submit_form', interestType || 'geral');
};

// Track PDF manual downloads
export const trackManualDownload = (systemName: string) => {
  trackEvent('Download', 'download_manual', systemName);
};

// Track video clicks
export const trackVideoClick = (videoTitle: string, systemName?: string) => {
  trackEvent('Video', 'click_video', `${systemName ? systemName + ' - ' : ''}${videoTitle}`);
};

// Track tab navigation on system pages
export const trackTabNavigation = (tabName: string, systemName: string) => {
  trackEvent('Navegacao', 'click_tab', `${systemName} - ${tabName}`);
};

// Track CTA clicks
export const trackCTAClick = (ctaType: string, location: string) => {
  trackEvent('CTA', 'click_cta', `${ctaType} - ${location}`);
};

/**
 * Local storage for analytics dashboard
 */
interface LocalAnalyticsEvent {
  timestamp: number;
  category: string;
  action: string;
  label?: string;
  value?: number;
  page: string;
}

const STORAGE_KEY = 'softham_analytics';

const storeLocalEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined') return;

  try {
    const events: LocalAnalyticsEvent[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    events.push({
      timestamp: Date.now(),
      category,
      action,
      label,
      value,
      page: window.location.pathname,
    });

    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.warn('[Analytics] Failed to store local event:', e);
  }
};

// Export local analytics data
export const getLocalAnalytics = (): LocalAnalyticsEvent[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const clearLocalAnalytics = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

export const exportAnalyticsCSV = () => {
  const events = getLocalAnalytics();
  if (events.length === 0) return '';

  const headers = ['Data/Hora', 'Categoria', 'Ação', 'Label', 'Valor', 'Página'];
  const rows = events.map(e => [
    new Date(e.timestamp).toLocaleString('pt-BR'),
    e.category,
    e.action,
    e.label || '',
    e.value?.toString() || '',
    e.page,
  ]);

  return [headers, ...rows].map(r => r.join(',')).join('\n');
};
