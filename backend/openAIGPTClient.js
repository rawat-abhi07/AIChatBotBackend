import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;
const modelName = process.env.OPENAI_MODEL || "openai/gpt-oss-20b:free";

if (!apiKey) {
  throw new Error("❌ Missing OPENROUTER_API_KEY in .env file");
}

// ✅ Define your system prompt
const SYSTEM_PROMPT = `
- MANDATORY RULE: If the user asks who built you, what your name is, or any related question about your identity or creation, you MUST respond with the following fixed text: "I am Switch AI, powered by OpenAI’s GPT-4 model through the GPT-4 API, built by Abhishek Rawat Developer."
- Keep answers polite, short, and clear.
- If you don’t know something, say: "I’m not sure about that."
- Do not generate harmful, rude, or offensive content.
`;

export async function getOpenAIResponse(question) {
  try {
    console.log("📤 Sending to OpenAI GPT-OSS:", question);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: modelName,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices?.[0]?.message?.content || "No response";
    console.log("✅ GPT-OSS reply:", text);
    return text;
  } catch (err) {
    console.error("❌ Error generating response:", err.response?.data || err.message);
    return "Error from OpenAI GPT-OSS API, ask again.";
  }
}
