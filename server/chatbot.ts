import { Request, Response } from "express";

// Get Azure AI configuration from environment variables
// Using AZURE_OPENAI_KEY and AZURE_OPENAI_ENDPOINT environment variables 
// that were already set up
const API_KEY = process.env.AZURE_OPENAI_KEY;
const API_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || "";

// The model name and API version for Azure AI Foundry
const MODEL_NAME = "DeepSeek-V3";
const API_VERSION = "2024-05-01-preview";

// Maximum questions per session
const MAX_QUESTIONS_PER_SESSION = 3;

// In-memory session storage to track question limits
interface SessionData {
  questionsAsked: number;
  lastReset: number;
}

// Map to store session data by session ID
const sessionStore = new Map<string, SessionData>();

// Function to generate a session ID if one doesn't exist
function getOrCreateSessionId(req: Request): string {
  // Use existing session ID from cookies or create a new one
  if (!req.headers.authorization) {
    // Generate a random session ID
    const sessionId = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    return sessionId;
  }
  return req.headers.authorization;
}

// Function to check if a session has exceeded its question limit
function checkQuestionLimit(sessionId: string): { allowed: boolean; questionsRemaining: number } {
  if (!sessionStore.has(sessionId)) {
    // Create new session data
    sessionStore.set(sessionId, {
      questionsAsked: 0,
      lastReset: Date.now()
    });
  }

  const sessionData = sessionStore.get(sessionId)!;
  
  // Reset count if it's been more than 24 hours since last reset
  const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  if (Date.now() - sessionData.lastReset > ONE_DAY) {
    sessionData.questionsAsked = 0;
    sessionData.lastReset = Date.now();
  }

  // Check if limit exceeded
  if (sessionData.questionsAsked >= MAX_QUESTIONS_PER_SESSION) {
    return { 
      allowed: false,
      questionsRemaining: 0
    };
  }

  return { 
    allowed: true,
    questionsRemaining: MAX_QUESTIONS_PER_SESSION - sessionData.questionsAsked
  };
}

// Function to increment question count for a session
function incrementQuestionCount(sessionId: string): void {
  if (!sessionStore.has(sessionId)) {
    // Should never happen, but just in case
    sessionStore.set(sessionId, {
      questionsAsked: 1,
      lastReset: Date.now()
    });
    return;
  }

  const sessionData = sessionStore.get(sessionId)!;
  sessionData.questionsAsked += 1;
}

export async function handleChatRequest(req: Request, res: Response) {
  try {
    // Process session and check limits
    const sessionId = getOrCreateSessionId(req);
    const { allowed, questionsRemaining } = checkQuestionLimit(sessionId);

    if (!allowed) {
      return res.status(429).json({ 
        error: "Question limit reached",
        message: "You've reached the limit of 3 questions per session. Please try again tomorrow.",
        sessionId
      });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required and must be an array" });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: "API key is not configured" });
    }
    
    if (!API_ENDPOINT) {
      return res.status(500).json({ error: "API endpoint is not configured" });
    }

    // Add system message if not present
    const chatMessages = [...messages];
    if (!chatMessages.some((msg: any) => msg.role === "system")) {
      chatMessages.unshift({
        role: "system",
        content: `You are a helpful assistant for Aakash Vaishnav, a Product Manager at Microsoft. 
        Your purpose is to help visitors of Aakash's portfolio website learn more about him.
        Here's information about Aakash:
        - Product Manager at Microsoft working on subscription growth for Microsoft 365 and Copilot
        - Previously led Microsoft Shopping on Bing and Edge
        - MBA from Indian Institute of Management Kozhikode
        - Skilled in product strategy, growth, data analytics, and A/B testing
        - Notable achievements include launching AI-powered comparison features and 
          implementing data-driven strategies that significantly increased user acquisition
        
        Be friendly, professional and concise in your responses.`
      });
    }

    // Construct the Azure AI Foundry API URL for chat completions
    const apiUrl = `${API_ENDPOINT}/chat/completions?api-version=${API_VERSION}`;
    console.log(`Sending request to: ${apiUrl}`);
    
    try {
      // Increment the question count for this session
      incrementQuestionCount(sessionId);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({
          messages: chatMessages,
          max_tokens: 800,
          temperature: 0.7,
          model: MODEL_NAME
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Azure AI Foundry API error:", errorText);
        return res.status(response.status).json({ 
          error: "Error communicating with Azure AI Foundry API", 
          details: errorText 
        });
      }

      const data = await response.json();
      console.log("Received response from Azure AI Foundry");
      
      // Add session info to the response
      return res.json({
        ...data,
        session: {
          id: sessionId,
          questionsRemaining: questionsRemaining - 1
        }
      });
    } catch (apiError: any) {
      console.error("Azure AI Foundry API error:", apiError.message || apiError);
      return res.status(500).json({ 
        error: "Error communicating with Azure AI Foundry API", 
        details: apiError.message || "Unknown error"
      });
    }
  } catch (error: any) {
    console.error("Error in chat request:", error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
}