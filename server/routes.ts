import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChatRequest } from "./chatbot";
import analyticsRoutes from "./routes/analytics";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this is primarily a static site, we don't need many API routes
  // but we can add some informational endpoints
  
  app.get('/api/info', (req, res) => {
    res.json({
      name: 'Aakash Vaishnav Portfolio',
      version: '1.0.0',
      description: 'Personal portfolio website with Linktree-inspired layout'
    });
  });

  // Chatbot API endpoint
  app.post("/api/chat", handleChatRequest);
  
  // Analytics API routes
  app.use("/api/analytics", analyticsRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
