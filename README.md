# 🚀 HomeLoanAI – Smart Loan Eligibility Platform

> AI-powered home loan eligibility checker with real-time insights, built using modern full-stack & DevOps practices.

---

## ✨ Features

- 🤖 AI Assistant (Google Gemini Integration)
- 📊 Loan Eligibility Prediction
- 📄 Document Guidance & Suggestions
- 💡 Personalized Financial Insights
- 🔐 Secure Authentication (Supabase)
- 📦 Fully Dockerized Application
- ⚙️ CI/CD Ready (GitHub Actions)

---

## 🧠 Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS

### Backend
- Node.js + Express
- Gemini API (Google AI)

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)

### Authentication
- Supabase

---

## 📦 Project Structure


frontend → React App (Port 4173)
backend → Express Server (Port 5000)


---

## ⚡ Quick Start (Docker – Recommended)

```bash
docker compose up --build

👉 Open:

http://localhost:4173
💻 Local Development Setup
1. Clone the repo
git clone https://github.com/your-username/homeloan-ai.git
cd homeloan-ai
2. Setup Environment

Copy .env.example → .env

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

VITE_GEMINI_API_KEY=your_gemini_key
VITE_GEMINI_MODEL=gemini-1.5-turbo
3. Install dependencies
npm install
4. Run frontend
npm run dev
5. Run backend
node server.js
🤖 AI Configuration
✅ Google Gemini (Recommended)
VITE_GEMINI_API_KEY=your_key
VITE_GEMINI_MODEL=gemini-1.5-turbo
🧪 Demo Mode

If no API key is provided:

App still works
AI responses are simulated
🐳 Docker Setup (Production Style)
docker compose up --build
🔄 CI/CD Pipeline
Auto build on push
Docker image creation
Ready for deployment
🧠 Architecture
User → Frontend (React)
      → /api/gemini
      → Backend (Express)
      → Gemini API
🎯 Key Highlights
Real-world full-stack architecture
Clean separation of frontend & backend
Docker-based scalable deployment
API proxy handling via Vite
Production-ready structure
🧑‍💻 Author

Ankit (B.Tech CSE)
Passionate about AI, Cloud & DevOps 🚀

⭐ If you like this project

Give it a ⭐ on GitHub and support!

