import { v4 as uuidv4 } from 'uuid';

// Get or create visitor ID safely
const getVisitorId = (): string => {
  try {
    // Check if localStorage is available (SSR safe)
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return 'visitor-ssr';
    }
    
    let visitorId = localStorage.getItem('portfolio_visitor_id');
    
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem('portfolio_visitor_id', visitorId);
    }
    
    return visitorId;
  } catch (error) {
    // Safe fallback if localStorage is disabled or errors
    return 'visitor-fallback';
  }
};

// Base analytics class
class AnalyticsClient {
  private static instance: AnalyticsClient;
  private visitorId: string;
  private initialized: boolean = false;
  
  private constructor() {
    this.visitorId = getVisitorId();
  }
  
  public static getInstance(): AnalyticsClient {
    if (!AnalyticsClient.instance) {
      AnalyticsClient.instance = new AnalyticsClient();
    }
    
    return AnalyticsClient.instance;
  }
  
  // Initialize analytics
  public init(): void {
    if (this.initialized) return;
    
    // Track initial page view on load
    this.trackPageView(window.location.pathname);
    
    // Set up custom event listeners
    this.setupEventListeners();
    
    this.initialized = true;
  }
  
  // Set up global event listeners
  private setupEventListeners(): void {
    // Track navigation events
    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });
    
    // Monitor link clicks (delegation)
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const linkElement = target.closest('a');
      
      if (linkElement && !linkElement.getAttribute('data-analytics-ignore')) {
        const linkUrl = linkElement.href;
        const linkName = linkElement.innerText || linkElement.getAttribute('aria-label') || 'Unknown';
        
        // Don't track navigation clicks that are handled by track manually in components
        if (!linkUrl.startsWith('#') && !linkUrl.startsWith('javascript:')) {
          this.trackLinkClick(linkName, linkUrl);
        }
      }
    });
  }
  
  // Send tracking data to backend
  private async sendEvent(endpoint: string, data: any): Promise<void> {
    try {
      // Make sure page is fully loaded and not in an error state 
      if (typeof window === 'undefined' || !window.navigator.onLine) {
        return;
      }
      
      const response = await fetch(`/api/analytics/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        console.warn(`Analytics: Error tracking ${endpoint}:`, await response.text());
      }
    } catch (error) {
      // Silently fail analytics (non-critical) to not break user experience
      console.warn(`Analytics: Could not send ${endpoint} event`);
    }
  }
  
  // Track page view
  public trackPageView(pagePath: string): void {
    // Ensure this is being called in the browser context
    if (typeof window === 'undefined') return;
    
    try {
      const referrer = document.referrer;
      this.sendEvent('pageview', {
        visitorId: this.visitorId,
        pagePath,
        referrer
      });
    } catch (error) {
      // Silent fail for analytics
    }
  }
  
  // Track link click
  public trackLinkClick(linkName: string, linkUrl: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      this.sendEvent('linkclick', {
        visitorId: this.visitorId,
        linkName,
        linkUrl,
        pagePath: window.location.pathname
      });
    } catch (error) {
      // Silent fail for analytics
    }
  }
  
  // Track project interaction
  public trackProjectInteraction(projectName: string, interactionType: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      this.sendEvent('project', {
        visitorId: this.visitorId,
        projectName,
        interactionType,
        pagePath: window.location.pathname
      });
    } catch (error) {
      // Silent fail for analytics
    }
  }
  
  // Track chatbot interaction
  public trackChatbotInteraction(questionType: string, questionCount: number): void {
    if (typeof window === 'undefined') return;
    
    try {
      this.sendEvent('chatbot', {
        visitorId: this.visitorId,
        questionType,
        questionCount
      });
    } catch (error) {
      // Silent fail for analytics
    }
  }
  
  // Track custom event
  public trackEvent(
    eventType: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    additionalData?: Record<string, any>
  ): void {
    if (typeof window === 'undefined') return;
    
    try {
      this.sendEvent('event', {
        eventType,
        eventCategory,
        eventAction,
        eventLabel,
        visitorId: this.visitorId,
        pagePath: window.location.pathname,
        additionalData
      });
    } catch (error) {
      // Silent fail for analytics
    }
  }
}

// Export singleton instance
export const analytics = AnalyticsClient.getInstance();

// Convenience exports
export const trackPageView = (pagePath: string) => analytics.trackPageView(pagePath);
export const trackLinkClick = (linkName: string, linkUrl: string) => analytics.trackLinkClick(linkName, linkUrl);
export const trackProjectInteraction = (projectName: string, interactionType: string) => 
  analytics.trackProjectInteraction(projectName, interactionType);
export const trackChatbotInteraction = (questionType: string, questionCount: number) => 
  analytics.trackChatbotInteraction(questionType, questionCount);
export const trackEvent = (
  eventType: string,
  eventCategory: string,
  eventAction: string,
  eventLabel?: string,
  additionalData?: Record<string, any>
) => analytics.trackEvent(eventType, eventCategory, eventAction, eventLabel, additionalData);

export default analytics;