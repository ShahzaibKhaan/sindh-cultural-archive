export async function askHeritageAi(payload: Record<string, string>) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "AI request failed. Please try again.");
  }

  return data.text || "AI response empty hai.";
}

export function friendlyAiError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "");

  if (message.includes("high demand") || message.includes("503") || message.includes("UNAVAILABLE")) {
    return "AI model abhi busy hai. Thori dair baad dobara try karein.";
  }

  if (message.startsWith("{")) {
    try {
      const parsed = JSON.parse(message);
      return parsed?.error?.message || "AI request failed. Please try again.";
    } catch {
    }
  }

  return message || "AI request failed. Please try again.";
}
