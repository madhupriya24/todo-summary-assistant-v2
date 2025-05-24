require('dotenv').config();
const axios = require('axios');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendTestMessage() {
  try {
    const res = await axios.post(SLACK_WEBHOOK_URL, {
      text: "Hello! This is a test message from Node.js script.",
    });
    console.log("Message sent successfully:", res.status);
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
}

sendTestMessage();
