import { Request, Response } from "express";

// Get Azure AI configuration from environment variables
// Using AZURE_OPENAI_KEY and AZURE_OPENAI_ENDPOINT environment variables 
// that were already set up
const API_KEY = process.env.AZURE_OPENAI_KEY;
const API_ENDPOINT = "https://ai-aakashvaishnav4597ai614307883805.services.ai.azure.com/models";

// The model name and API version for Azure AI Foundry
const MODEL_NAME = "DeepSeek-V3";
const API_VERSION = "2024-05-01-preview";

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required and must be an array" });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: "API key is not configured" });
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
      
      return res.json(data);
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