import 'dotenv/config';
import express from "express";
import cors from "cors";
import axios from "axios";
import OpenAI from "openai";
import { supabase } from "./supabaseClient.js";

; // Make sure this file exists and exports your Supabase client

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// ✅ Get all todos
app.get("/todos", async (req, res) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ Create a new todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Todo text is required" });
  }

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task: text, status: "Not Started" }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

// ✅ Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).send();
});

// ✅ Summarize todos & send to Slack
app.post("/summarize", async (req, res) => {
  try {
    const todos = req.body.todos;

    if (!todos || !Array.isArray(todos)) {
      return res.status(400).json({ error: "Invalid todos data" });
    }

    const prompt = `Summarize these todos in short sentences:\n${todos.map((t) => "- " + t.text).join("\n")}`;
    console.log("🟡 Prompt:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const summary = response?.choices?.[0]?.message?.content?.trim() || "Summary not generated";
    console.log("🟢 Summary:", summary);

    let slackStatus = "Slack message not sent";
    if (SLACK_WEBHOOK_URL) {
      try {
        await axios.post(SLACK_WEBHOOK_URL, {
          text: `📝 *Todo Summary:*\n${summary}`,
        });
        slackStatus = "Summary sent to Slack successfully ✅";
      } catch (slackErr) {
        console.error("Slack error:", slackErr.message);
        slackStatus = "Failed to send summary to Slack ❌";
      }
    }

    res.json({ summary, slackStatus });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Failed to generate summary or send to Slack" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
