import { Request, Response } from "express";

// Get Azure OpenAI configuration from environment variables
const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;

// The deployment name and API version for your model in Azure AI
const deploymentName = "o3-mini";
const apiVersion = "2024-12-01-preview";

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required and must be an array" });
    }

    if (!AZURE_OPENAI_KEY || !AZURE_OPENAI_ENDPOINT) {
      return res.status(500).json({ error: "Azure OpenAI API credentials are not configured" });
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

    // Construct the Azure OpenAI API URL
    const apiUrl = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
    console.log(`Sending request to: ${apiUrl}`);
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": AZURE_OPENAI_KEY,
        },
        body: JSON.stringify({
          messages: chatMessages,
          max_tokens: 800,
          temperature: 0.7
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Azure OpenAI API error:", errorText);
        return res.status(response.status).json({ 
          error: "Error communicating with Azure OpenAI API", 
          details: errorText 
        });
      }

      const data = await response.json();
      console.log("Received response from Azure OpenAI");
      
      return res.json(data);
    } catch (apiError: any) {
      console.error("Azure OpenAI API error:", apiError.message || apiError);
      return res.status(500).json({ 
        error: "Error communicating with Azure OpenAI API", 
        details: apiError.message || "Unknown error"
      });
    }
  } catch (error: any) {
    console.error("Error in chat request:", error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
}