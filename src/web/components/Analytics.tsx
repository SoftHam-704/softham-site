/**
 * Analytics Component
 * 
 * Automatically initializes Google Analytics 4 and tracks page views.
 * Place this component once at the root of your app (e.g., in App.tsx or Provider).
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to src/web/lib/analytics.ts
 * 2. Replace 'G-XXXXXXXXXX' with your GA4 Measurement ID
 * 3. That's it! Analytics will start tracking automatically.
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { initGA, trackPageView } from '../lib/analytics';

interface AnalyticsProps {
  children?: React.ReactNode;
}

export const Analytics = ({ children }: AnalyticsProps) => {
  const [location] = useLocation();

  // Initialize GA4 on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes and scroll to top
  useEffect(() => {
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Small delay to ensure page title has updated
    const timer = setTimeout(() => {
      trackPageView(location, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return <>{children}</>;
};

export default Analytics;
