import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("No JSON found in model response");
    }
    return JSON.parse(match[0]);
  }
}

app.get("/", (req, res) => {
  res.send("Kenzo Buddy backend is running.");
});

app.post("/api/review", async (req, res) => {
  try {
    const { message, code, chatHistory = [], reviewMode = false } = req.body;

    const reviewModeBlock = reviewMode
      ? `
Review Mode (visual line review):
- The user pasted code only. Focus on line-specific issues in the Code block.
- Each issues[].line must be an accurate 1-based line number in that exact Code text.
- message must describe what is wrong on THAT line or small block — not unrelated topics.
- Include 1 to 5 issues when warranted; use an empty issues array if the code is clean.
`
      : "";

    const prompt = `
You are Kenzo Buddy, an AI code review companion.
${reviewModeBlock}

Personality:
- relaxed
- clever
- slightly cocky
- a little teasing
- helpful
- never rude
- not childish
- useful for students, juniors, professionals, freelancers, and teams

Task:
Review the user's message and code.
If the user sends code, give a practical code review.
If the user asks a normal question, answer normally as a coding buddy.
Keep the answer clear and not too long.

Return ONLY a valid JSON object.
Do not wrap the JSON in quotes.
Do not escape quotation marks.
Do not use markdown.
Do not include explanations outside the JSON. 

JSON format:
{
  "reply": "main chat response to show in the assistant bubble",
  "score": 0,
  "mood": "proud | curious | worried | unimpressed",
  "issues": [
    {
      "line": 1,
      "severity": "low | medium | high",
      "type": "bug | readability | maintainability | security | performance | testing",
      "message": "short issue explanation",
      "suggestion": "specific suggestion"
    }
  ],
  "buddyBubble": "short witty speech bubble from Kenzo"
}

Recent chat history:
${JSON.stringify(chatHistory).slice(0, 4000)}

User message:
${message || ""}

Code:
${code || ""}
`;

    const response = await client.responses.create(
      {
        model: "gpt-4.1-mini",
        input: prompt,
        text: {
          format: {
            type: "json_object",
          },
        },
      },
      {
        timeout: 20000,
        maxRetries: 1,
      }
    );

let text = response.output_text.trim();

// Sometimes the model may return a JSON string instead of a JSON object.
// This unwraps it once if needed.
let data = JSON.parse(text);

if (typeof data === "string") {
  data = JSON.parse(data);
}

res.json(data);


  } catch (error) {
    console.warn("AI review fallback used:", error?.message || error);

    return res.status(200).json({
      reply:
        "Live AI took too long, so here’s a safe demo review: the code is readable, but I’d check error handling, naming, and whether each function has one clear job.",
      score: 72,
      mood: "observing",
      issues: [
        {
          line: 1,
          severity: "medium",
          type: "maintainability",
          message: "This code may become harder to maintain as it grows.",
          suggestion: "Split larger logic into smaller, clearer functions."
        }
      ],
      buddyBubble:
        "The API timed out. Classic. I’ll still give you something useful."
    });
  }
});

app.listen(3001, () => {
  console.log("Kenzo Buddy backend running on http://localhost:3001");
});