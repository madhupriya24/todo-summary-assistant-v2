A full-stack web application that lets users manage their todos, generate a smart summary using an AI model (OpenAI), and automatically send that summary to a Slack channel via webhook integration.

🚀 Features
✅ Add, edit, and delete todos

🤖 Summarize todos using OpenAI or Cohere API

📤 Send summary to a Slack channel via webhook

💬 Show Slack status (success/failure) in the UI

🛠️ Tech Stack
Layer	Technology Used
Frontend	React (Create React App)
Backend	Node.js + Express
AI API	OpenAI (or Cohere)
Integration	Slack Webhook

🧰 Prerequisites
Node.js version 16 or higher is recommended

npm (comes with Node.js)

⚙️ Setup and Run
Backend
Navigate to the backend folder:
cd mytodoapp-backend
Install dependencies:
npm install
Create a .env file with the required environment variables (see below).

Start the backend server:
npm start
Backend will run at: http://localhost:5000

Frontend
Navigate to the frontend folder:
cd mytodoapp-frontend
Install dependencies:
npm install
Start the frontend development server:
npm start
Frontend will run at: http://localhost:3000

🔐 Environment Variables
Create a .env file inside the backend folder with the following variables:


OPENAI_API_KEY=your_openai_api_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
Replace the placeholders with your actual API keys.

🔗 Slack Integration
This project uses Slack Incoming Webhooks to post todo summaries to a Slack channel.

How to configure Slack Webhook
Create a Slack app at https://api.slack.com/apps

Enable Incoming Webhooks for your app.

Add a new webhook URL and select the channel for posting summaries.

Copy the webhook URL and set it as SLACK_WEBHOOK_URL in your .env file.

Restart your backend server after updating the .env file.

📁 Project Structure

todo-summary-assistant/
├── mytodoapp-frontend/           
│   ├── public/                   
│   ├── src/                      
│   │   ├── components/           
│   │   ├── pages/                
│   │   ├── App.jsx               
│   │   └── index.js          
│   ├── .env.example             
│   └── package.json             
│
├── mytodoapp-backend/          
│   ├── routes/                  
│   ├── controllers/            
│   ├── services/                
│   ├── utils/                   
│   ├── .env.example             
│   ├── index.js                 
│   └── package.json             
│
├── README.md                    
├── .gitignore                   
└── LICENSE                      
