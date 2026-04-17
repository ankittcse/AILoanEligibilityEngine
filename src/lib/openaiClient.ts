type OpenAIMessage = { role: "system" | "user" | "assistant"; content: string };

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY as string;
const openAIModel = (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-3.5-turbo";

if (!openAIKey) {
  console.warn("VITE_OPENAI_API_KEY is not set. ChatAssistant will fall back to demo responses.");
}

export async function getChatResponse(messages: OpenAIMessage[]) {
  if (!openAIKey) {
    throw new Error("Missing VITE_OPENAI_API_KEY");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIKey}`,
    },
    body: JSON.stringify({
      model: openAIModel,
      messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() ?? "";
}
