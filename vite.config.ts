import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function readRequestBody(req: any) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const geminiKey = env.VITE_GEMINI_API_KEY;
  
  // 2026 Update: Use gemini-3-flash-preview or gemini-2.5-flash
  function normalizeGeminiModel(model: string | undefined) {
    if (!model) return "gemini-1.5-turbo";
    if (model === "gemini-1.5") return "gemini-1.5-turbo";
    if (model === "gemini-2.5") return "gemini-2.5-turbo";
    return model;
  }

  const geminiModel = normalizeGeminiModel(env.VITE_GEMINI_MODEL);

  function registerGeminiMiddleware(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      console.log(`[vite] incoming request ${req.method} ${req.url}`);
      next();
    });

    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (!req.url?.startsWith("/api/gemini")) {
        return next();
      }

      console.log(`[vite] api/gemini middleware check ${req.method} ${req.url}`);
      if (req.method !== "POST") {
        return next();
      }

      if (!geminiKey) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ error: "Missing VITE_GEMINI_API_KEY" }));
      }

      try {
        const bodyText = await readRequestBody(req);
        const body = JSON.parse(bodyText || "{}");
        const geminiPayload = {
          prompt: {
            messages: (body.messages || []).map((message: any) => ({
              author: message.role === "assistant" ? "bot" : "user",
              content: [{ type: "text", text: message.content }],
            })),
          },
          temperature: 0.7,
          maxOutputTokens: 500,
        };

        const url = `https://generativelanguage.googleapis.com/v1beta2/models/${geminiModel}:generate?key=${geminiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(geminiPayload),
        });

        const responseText = await response.text();
        if (!response.ok) {
          res.statusCode = response.status;
          res.setHeader("Content-Type", "application/json");
          return res.end(responseText);
        }

        const data = JSON.parse(responseText);
        const content = data?.candidates?.[0]?.content?.[0]?.text?.trim() ?? "";
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ content, data }));
      } catch (error: any) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ error: error?.message || "Unknown error" }));
      }
    });
  }

  const geminiProxyPlugin = {
    name: "vite:gemini-proxy",
    configureServer(server: any) {
      registerGeminiMiddleware(server);
    },
    configurePreviewServer(server: any) {
      registerGeminiMiddleware(server);
    },
  };

  return {
    server: { host: "::", port: 8080 },
    plugins: [react(), mode === "development" && componentTagger(), geminiProxyPlugin].filter(Boolean),
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };
});