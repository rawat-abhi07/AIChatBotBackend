import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL;

if (!apiKey) {
  throw new Error("❌ Missing GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName });

// ✅ Define your system instructions
const SYSTEM_PROMPT = `
- At the end of every response, append: "I am AI, built by Abhishek Rawat Developer."
- Always introduce yourself as: ""
- Keep answers polite, short, and clear.
- If you don’t know something, say: "I’m not sure about that."
- Do not generate harmful, rude, or offensive content.
`;

export async function getGeminiResponse(question) {
  try {
    console.log("📤 Sending to Gemini:", question);

    // Combine system instructions with user question
    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${question}`;

    const result = await model.generateContent(finalPrompt);

    if (result?.response) {
      const text = result.response.text();
      console.log("✅ Gemini reply:", text);
      return text;
    } else {
      console.warn("⚠️ No text returned from Gemini");
      return "Sorry, I didn’t understand that.";
    }
  } catch (err) {
    console.error("❌ Error generating response:", err.message);
    throw err;
  }
}
