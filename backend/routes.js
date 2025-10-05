import express from "express";
import { getGeminiResponse } from "./geminiClient.js";
import { getOpenAIResponse } from "./openAIGPTClient.js";
const router = express.Router();

// POST /api/ask
router.post("/gemini/ask", async (req, res) => {
  try {
    console.log("inside router ,"+ req.body);
    
    const { question } = req.body;
    console.log("📩 Received question:", question);

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await getGeminiResponse(question);
    console.log("🤖 Gemini response:", answer);

    res.json({ answer });
  } catch (err) {
    console.error("❌ Error in /ask route:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.post("/chatGpt/ask", async (req, res) => {
  try {
    console.log("inside router ,"+ req.body);
    
    const { question } = req.body;
    console.log("📩 Received question:", question);

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await getOpenAIResponse(question);
    console.log("🤖 OpenAI response:", answer);

    res.json({ answer });
  } catch (err) {
    console.error("❌ Error in /ask route:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
