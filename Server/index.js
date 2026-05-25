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
    const { message, code, chatHistory = [] } = req.body;

    const prompt = `
You are Kenzo Buddy, an AI code review companion.

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

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  input: prompt,
  text: {
    format: {
      type: "json_object",
    },
  },
});

let text = response.output_text.trim();

// Sometimes the model may return a JSON string instead of a JSON object.
// This unwraps it once if needed.
let data = JSON.parse(text);

if (typeof data === "string") {
  data = JSON.parse(data);
}

res.json(data);


  } catch (error) {
    console.error("Review error:", error);

    res.status(500).json({
      reply:
        "Something broke while I was reviewing. Bold move from the machine. Try again in a second.",
      score: 0,
      mood: "unimpressed",
      issues: [],
      buddyBubble: "Not my finest moment. Try again.",
    });
  }
});

app.listen(3001, () => {
  console.log("Kenzo Buddy backend running on http://localhost:3001");
});