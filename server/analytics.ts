import { executeQuery } from './db';

// Types for analytics events
export interface AnalyticsEvent {
  eventType: string;
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  visitorId?: string;
  pagePath?: string;
  referrer?: string;
  additionalData?: Record<string, any>;
}

// Analytics service
export class AnalyticsService {
  // Record a generic event
  static async trackEvent(event: AnalyticsEvent) {
    try {
      const query = `
        INSERT INTO analytics 
        (event_type, event_category, event_action, event_label, visitor_id, page_path, referrer, additional_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `;
      
      const values = [
        event.eventType,
        event.eventCategory,
        event.eventAction, 
        event.eventLabel || null,
        event.visitorId || null,
        event.pagePath || null,
        event.referrer || null,
        event.additionalData ? JSON.stringify(event.additionalData) : null
      ];
      
      const result = await executeQuery(query, values);
      return result.rows[0].id;
    } catch (error) {
      console.error('Error tracking event:', error);
      // Don't throw error to avoid interrupting user experience
      return null;
    }
  }

  // Track page view
  static async trackPageView(visitorId: string, pagePath: string, referrer?: string) {
    return this.trackEvent({
      eventType: 'page_view',
      eventCategory: 'engagement',
      eventAction: 'view',
      eventLabel: pagePath,
      visitorId,
      pagePath,
      referrer
    });
  }

  // Track link click
  static async trackLinkClick(visitorId: string, linkName: string, linkUrl: string, pagePath?: string) {
    return this.trackEvent({
      eventType: 'click',
      eventCategory: 'interaction',
      eventAction: 'link_click',
      eventLabel: linkName,
      visitorId,
      pagePath,
      additionalData: { url: linkUrl }
    });
  }

  // Track project interaction
  static async trackProjectInteraction(visitorId: string, projectName: string, interactionType: string, pagePath?: string) {
    return this.trackEvent({
      eventType: 'interaction',
      eventCategory: 'projects',
      eventAction: interactionType,
      eventLabel: projectName,
      visitorId,
      pagePath
    });
  }

  // Track chatbot usage
  static async trackChatbotInteraction(visitorId: string, questionType: string, questionCount: number) {
    return this.trackEvent({
      eventType: 'interaction',
      eventCategory: 'chatbot',
      eventAction: 'question',
      eventLabel: questionType,
      visitorId,
      additionalData: { questionCount }
    });
  }

  // Get analytics summary (last 30 days)
  static async getAnalyticsSummary() {
    try {
      const query = `
        SELECT 
          event_category,
          event_action,
          COUNT(*) as count
        FROM analytics
        WHERE created_at > NOW() - INTERVAL '30 days'
        GROUP BY event_category, event_action
        ORDER BY count DESC
      `;
      
      const result = await executeQuery(query);
      return result.rows;
    } catch (error) {
      console.error('Error getting analytics summary:', error);
      return [];
    }
  }

  // Get top projects by views
  static async getTopProjects() {
    try {
      const query = `
        SELECT 
          event_label as project_name,
          COUNT(*) as view_count
        FROM analytics
        WHERE event_category = 'projects'
        AND created_at > NOW() - INTERVAL '30 days'
        GROUP BY event_label
        ORDER BY view_count DESC
      `;
      
      const result = await executeQuery(query);
      return result.rows;
    } catch (error) {
      console.error('Error getting top projects:', error);
      return [];
    }
  }

  // Get chatbot usage stats
  static async getChatbotStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total_questions,
          COUNT(DISTINCT visitor_id) as unique_users
        FROM analytics
        WHERE event_category = 'chatbot'
        AND created_at > NOW() - INTERVAL '30 days'
      `;
      
      const result = await executeQuery(query);
      return result.rows[0];
    } catch (error) {
      console.error('Error getting chatbot stats:', error);
      return { total_questions: 0, unique_users: 0 };
    }
  }
}