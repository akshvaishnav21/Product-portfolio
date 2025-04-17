import { Request, Response } from "express";

const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;

// These values can be obtained from your Azure OpenAI resource in the Azure portal
// The deployment name you chose when you deployed the model
const deploymentName = "gpt-35-turbo"; // Change this to your actual deployment name

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
    if (!messages.some((msg: any) => msg.role === "system")) {
      messages.unshift({
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

    const response = await fetch(`${AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=2023-05-15`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": AZURE_OPENAI_KEY,
      },
      body: JSON.stringify({
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Azure OpenAI API error:", errorData);
      return res.status(response.status).json({ 
        error: "Error communicating with Azure OpenAI API", 
        details: errorData 
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error in chat request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}