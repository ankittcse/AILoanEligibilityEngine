import express from 'express';
import { createServer } from 'http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

const geminiKey = process.env.VITE_GEMINI_API_KEY;

app.post('/api/gemini', async (req, res) => {
  console.log("--- New Request Received ---");
  
  if (!geminiKey) {
    console.error("❌ ERROR: VITE_GEMINI_API_KEY is missing");
    return res.status(500).json({ error: 'Missing API Key' });
  }

  try {
    const { messages } = req.body;
    
    // Clean history: Remove any previous "Something went wrong" messages
    const cleanMessages = messages.filter(m => !m.content.includes("Something went wrong"));

    const geminiPayload = {
      contents: cleanMessages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    };

    // UPDATED MODEL: gemini-1.5-flash is retired. Using gemini-2.5-flash (2026 standard)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    console.log("Calling Gemini API (gemini-2.5-flash)...");

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Gemini API Error:", JSON.stringify(data));
      return res.status(response.status).json(data);
    }

    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    console.log("✅ Success! The AI is talking.");
    res.json({ content });

  } catch (error) {
    console.error("❌ Server Crash:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 AI Server live at http://localhost:${PORT}`);
});