import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../analytics';
import { z } from 'zod';

const router = Router();

// Schema for event validation
const eventSchema = z.object({
  eventType: z.string(),
  eventCategory: z.string(),
  eventAction: z.string(),
  eventLabel: z.string().optional(),
  visitorId: z.string(),
  pagePath: z.string().optional(),
  referrer: z.string().optional(),
  additionalData: z.record(z.any()).optional(),
});

// Schema for page view validation
const pageViewSchema = z.object({
  visitorId: z.string(),
  pagePath: z.string(),
  referrer: z.string().optional(),
});

// Schema for link click validation
const linkClickSchema = z.object({
  visitorId: z.string(),
  linkName: z.string(),
  linkUrl: z.string(),
  pagePath: z.string().optional(),
});

// Schema for project interaction validation
const projectInteractionSchema = z.object({
  visitorId: z.string(),
  projectName: z.string(),
  interactionType: z.string(),
  pagePath: z.string().optional(),
});

// Schema for chatbot interaction validation
const chatbotInteractionSchema = z.object({
  visitorId: z.string(),
  questionType: z.string(),
  questionCount: z.number(),
});

// Record generic event
router.post('/event', async (req: Request, res: Response) => {
  try {
    const event = eventSchema.parse(req.body);
    const result = await AnalyticsService.trackEvent(event);
    return res.status(200).json({ success: true, id: result });
  } catch (error) {
    console.error('Error tracking event:', error);
    return res.status(400).json({ 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors 
        : 'Invalid request data' 
    });
  }
});

// Record page view
router.post('/pageview', async (req: Request, res: Response) => {
  try {
    const data = pageViewSchema.parse(req.body);
    const result = await AnalyticsService.trackPageView(data.visitorId, data.pagePath, data.referrer);
    return res.status(200).json({ success: true, id: result });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return res.status(400).json({ 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors 
        : 'Invalid request data' 
    });
  }
});

// Record link click
router.post('/linkclick', async (req: Request, res: Response) => {
  try {
    const data = linkClickSchema.parse(req.body);
    const result = await AnalyticsService.trackLinkClick(
      data.visitorId,
      data.linkName,
      data.linkUrl,
      data.pagePath
    );
    return res.status(200).json({ success: true, id: result });
  } catch (error) {
    console.error('Error tracking link click:', error);
    return res.status(400).json({ 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors 
        : 'Invalid request data' 
    });
  }
});

// Record project interaction
router.post('/project', async (req: Request, res: Response) => {
  try {
    const data = projectInteractionSchema.parse(req.body);
    const result = await AnalyticsService.trackProjectInteraction(
      data.visitorId,
      data.projectName,
      data.interactionType,
      data.pagePath
    );
    return res.status(200).json({ success: true, id: result });
  } catch (error) {
    console.error('Error tracking project interaction:', error);
    return res.status(400).json({ 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors 
        : 'Invalid request data' 
    });
  }
});

// Record chatbot interaction
router.post('/chatbot', async (req: Request, res: Response) => {
  try {
    const data = chatbotInteractionSchema.parse(req.body);
    const result = await AnalyticsService.trackChatbotInteraction(
      data.visitorId,
      data.questionType,
      data.questionCount
    );
    return res.status(200).json({ success: true, id: result });
  } catch (error) {
    console.error('Error tracking chatbot interaction:', error);
    return res.status(400).json({ 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors 
        : 'Invalid request data' 
    });
  }
});

// Get analytics summary (admin access should be protected in production)
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const summary = await AnalyticsService.getAnalyticsSummary();
    return res.status(200).json({ success: true, data: summary });
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get top projects (admin access should be protected in production)
router.get('/topprojects', async (req: Request, res: Response) => {
  try {
    const topProjects = await AnalyticsService.getTopProjects();
    return res.status(200).json({ success: true, data: topProjects });
  } catch (error) {
    console.error('Error getting top projects:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get chatbot stats (admin access should be protected in production)
router.get('/chatbotstats', async (req: Request, res: Response) => {
  try {
    const chatbotStats = await AnalyticsService.getChatbotStats();
    return res.status(200).json({ success: true, data: chatbotStats });
  } catch (error) {
    console.error('Error getting chatbot stats:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;