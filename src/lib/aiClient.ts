type AIMessage = { role: "system" | "user" | "assistant"; content: string };

async function getGeminiResponse(messages: AIMessage[]) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    let errorText = "Server error";
    try {
      const text = await response.text();
      errorText = text || errorText;
    } catch {}
    throw new Error(errorText);
  }

  const data = await response.json();

  if (!data || !data.content) {
    throw new Error("Invalid response from server");
  }

  return data.content;
}

function getDemoResponse() {
  return "AI service not configured. Please check backend setup.";
}

export async function getChatResponse(messages: AIMessage[]) {
  try {
    return await getGeminiResponse(messages);
  } catch (error: any) {
    console.error("Chat error:", error);
    return "Something went wrong. Check backend connection.";
  }
}