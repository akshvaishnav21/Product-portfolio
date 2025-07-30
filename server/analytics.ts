// Analytics service with database functionality removed
export class AnalyticsService {
  // All methods now return mock data or do nothing
  static async trackEvent(event: any) {
    console.log('Analytics event (not persisted):', event);
    return null;
  }

  static async trackPageView(visitorId: string, pagePath: string, referrer?: string) {
    console.log('Page view (not persisted):', { visitorId, pagePath, referrer });
    return null;
  }

  static async trackLinkClick(visitorId: string, linkName: string, linkUrl: string, pagePath?: string) {
    console.log('Link click (not persisted):', { visitorId, linkName, linkUrl, pagePath });
    return null;
  }

  static async trackProjectInteraction(visitorId: string, projectName: string, interactionType: string, pagePath?: string) {
    console.log('Project interaction (not persisted):', { visitorId, projectName, interactionType, pagePath });
    return null;
  }

  static async trackChatbotInteraction(visitorId: string, questionType: string, questionCount: number) {
    console.log('Chatbot interaction (not persisted):', { visitorId, questionType, questionCount });
    return null;
  }

  static async getAnalyticsSummary() {
    return [];
  }

  static async getTopProjects() {
    return [];
  }

  static async getChatbotStats() {
    return { total_questions: 0, unique_users: 0 };
  }
}