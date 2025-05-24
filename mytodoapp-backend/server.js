require('dotenv').config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.post("/summarize", async (req, res) => {
  try {
    const todos = req.body.todos;
    if (!todos || !Array.isArray(todos)) {
      return res.status(400).json({ error: "Invalid todos data" });
    }

    // const prompt = `Summarize these todos in short sentences:\n${todos.map((t) => "- " + t.text).join("\n")}`;

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: prompt }],
    //   max_tokens: 150,
    // });

    // const summary = response?.choices?.[0]?.message?.content?.trim() || "Summary not generated";


    // let slackStatus = "Slack message not sent";
    // if (SLACK_WEBHOOK_URL) {
    //   try {
    //     await axios.post(SLACK_WEBHOOK_URL, {
    //       text: `📝 *Todo Summary:*\n${summary}`,
    //     });
    //     slackStatus = "Summary sent to Slack successfully ✅";
    //   } catch (slackErr) {
    //     console.error("Slack error:", slackErr.message);
    //     slackStatus = "Failed to send summary to Slack ❌";
    //   }
    // }

    // res.json({ summary, slackStatus });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate summary or send to Slack" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
