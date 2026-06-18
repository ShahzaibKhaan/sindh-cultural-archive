import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type GeminiAction = "search" | "summary" | "translate" | "polish";
const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-flash-lite-latest",
];

function buildPrompt(action: GeminiAction, input: string) {
  if (action === "summary") {
    return `
You are a museum curator for a digital archive of Sindh's minority cultural heritage.
Create a short museum label from the text below.
Rules:
- 2 to 3 sentences only
- clear and academic
- mention cultural significance

Text: ${input}
`;
  }

  if (action === "translate") {
    return `
Translate the following Sindhi/Urdu/English heritage text into clear English.
Keep names, places, and cultural terms accurate.
If the text is already English, improve clarity without changing meaning.

Text: ${input}
`;
  }

  if (action === "polish") {
    return `
You are helping an admin review a public heritage submission.
Rewrite the text professionally for a cultural archive.
Keep it respectful, factual, concise, and suitable for publication.
Return only the improved description.

Submission: ${input}
`;
  }

  return `
You are an expert historian specializing in Sindh's cultural heritage.
Answer professionally, concisely, and keep the response useful for a digital archive website.
Include relevant context about community, location, architecture, or preservation when possible.

User query: ${input}
`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const searchTerm = body.searchTerm || body.text || body.prompt || "";
    const action = (body.action || "search") as GeminiAction;

    if (!searchTerm?.trim()) {
      return NextResponse.json(
        { error: { message: "Text is required" } },
        { status: 400 }
      );
    }

    
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: { message: "Gemini API key missing in .env.local" } },
        { status: 500 }
      );
    }

    const prompt = buildPrompt(action, searchTerm.trim());

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let lastError = "";
    let text = "";

    for (const model of GEMINI_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        text = response.text || "";
        if (text) break;
      } catch (error: any) {
        lastError = parseGeminiError(error);
      }
    }

    if (!text) {
      return NextResponse.json(
        {
          error: {
            message:
              lastError ||
              "AI service abhi busy hai. Please thori dair baad dobara try karein.",
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          message: parseGeminiError(error) || "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}

function parseGeminiError(error: any) {
  const rawMessage = error?.message || String(error || "");

  try {
    const jsonStart = rawMessage.indexOf("{");
    if (jsonStart >= 0) {
      const parsed = JSON.parse(rawMessage.slice(jsonStart));
      const message = parsed?.error?.message;
      if (message?.includes("high demand") || parsed?.error?.code === 503) {
        return "AI model abhi high demand par hai. Backup model bhi busy tha, thori dair baad try karein.";
      }
      if (message) return message;
    }
  } catch {
  }

  if (rawMessage.includes("high demand") || rawMessage.includes("503")) {
    return "AI model abhi high demand par hai. Thori dair baad dobara try karein.";
  }

  return rawMessage;
}
