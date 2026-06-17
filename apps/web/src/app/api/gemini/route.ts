import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type GeminiAction = "search" | "summary" | "translate" | "polish";

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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "Sorry, AI se response nahi mila.";

    return NextResponse.json({ text });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          message: error.message || "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
