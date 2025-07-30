import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../analytics';

const router = Router();

// All analytics endpoints now return success without database operations
router.post('/event', async (req: Request, res: Response) => {
  const result = await AnalyticsService.trackEvent(req.body);
  return res.status(200).json({ success: true, id: result });
});

router.post('/pageview', async (req: Request, res: Response) => {
  const { visitorId, pagePath, referrer } = req.body;
  const result = await AnalyticsService.trackPageView(visitorId, pagePath, referrer);
  return res.status(200).json({ success: true, id: result });
});

router.post('/linkclick', async (req: Request, res: Response) => {
  const { visitorId, linkName, linkUrl, pagePath } = req.body;
  const result = await AnalyticsService.trackLinkClick(visitorId, linkName, linkUrl, pagePath);
  return res.status(200).json({ success: true, id: result });
});

router.post('/project', async (req: Request, res: Response) => {
  const { visitorId, projectName, interactionType, pagePath } = req.body;
  const result = await AnalyticsService.trackProjectInteraction(visitorId, projectName, interactionType, pagePath);
  return res.status(200).json({ success: true, id: result });
});

router.post('/chatbot', async (req: Request, res: Response) => {
  const { visitorId, questionType, questionCount } = req.body;
  const result = await AnalyticsService.trackChatbotInteraction(visitorId, questionType, questionCount);
  return res.status(200).json({ success: true, id: result });
});

router.get('/summary', async (req: Request, res: Response) => {
  const summary = await AnalyticsService.getAnalyticsSummary();
  return res.status(200).json({ success: true, data: summary });
});

router.get('/topprojects', async (req: Request, res: Response) => {
  const topProjects = await AnalyticsService.getTopProjects();
  return res.status(200).json({ success: true, data: topProjects });
});

router.get('/chatbotstats', async (req: Request, res: Response) => {
  const chatbotStats = await AnalyticsService.getChatbotStats();
  return res.status(200).json({ success: true, data: chatbotStats });
});

export default router;