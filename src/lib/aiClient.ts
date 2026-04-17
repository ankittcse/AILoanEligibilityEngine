type AIMessage = { role: "system" | "user" | "assistant"; content: string };

// This checks if the key exists in your Vite environment
const geminiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

async function getGeminiResponse(messages: AIMessage[]) {
  // CHANGED: Port updated to 5000 to match your updated server.js
  const response = await fetch("http://localhost:5000/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Server error");
  }

  const data = await response.json();
  return data.content || "No response";
}

function getDemoResponse() {
  return "AI service not configured. Make sure VITE_GEMINI_API_KEY is in your .env file.";
}

export async function getChatResponse(messages: AIMessage[]) {
  try {
    // Only attempt the call if the key is present
    if (geminiKey) {
      return await getGeminiResponse(messages);
    }
    return getDemoResponse();
  } catch (error: any) {
    console.error("Chat error:", error);
    // This is the error message shown in your screenshot
    return "Something went wrong. Check backend connection.";
  }
}