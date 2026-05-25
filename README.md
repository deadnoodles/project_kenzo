# Kenzo Buddy

Kenzo Buddy is an AI-powered code review assistant with a playful mascot interface.  
The project combines two main workflows:

- **Review Mode** — paste code, get highlighted issues, and inspect explanations line by line.
- **Chat Mode** — talk with Kenzo about your code, ask follow-up questions, and continue a review conversationally.

The goal is to make code review feel less intimidating, more visual, and easier to understand.

---

## Features

### Visual Code Review

Users can paste a code snippet and receive an AI-generated review.  
The review highlights specific lines and provides explanations, suggestions, severity levels, and a review summary.

### Clickable Highlights

Highlighted lines can be clicked to open a focused explanation in the Kenzo inspector panel.

### Chat Mode

Users can chat with Kenzo about code, debugging, improvements, or review results.

### Review-to-Chat Handoff

From Review Mode, users can click **Ask Kenzo in Chat** to send the full reviewed code snippet into Chat Mode with a follow-up prompt asking for a deeper explanation.

### Dynamic Mascot States

Kenzo changes mood depending on the review/chat state:

- happy — default / good review
- observing — while the backend is processing
- angry — problematic code or high severity issues
- sad — backend/API error

### Animated Interface

The frontend includes animated UI elements such as:

- typewriter heading on the landing page
- floating preview panels
- subtle grid background
- cursor-based background lighting
- smooth transitions and hover states

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- Framer Motion
- Lucide React icons

### Backend

- Node.js
- Express
- OpenAI API
- dotenv
- CORS

---

## Project Structure

```txt
Project_Kenzo/
├── Server/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── src/
│   ├── assets/
│   │   ├── kenzo_happy_fullbody.png
│   │   ├── kenzo_sad_fullbody.png
│   │   ├── kenzo_observing_fullbody.png
│   │   └── kenzo_angry_fullbody.png
│   │
│   ├── components/
│   │   ├── AppBackground.tsx
│   │   ├── AppNav.tsx
│   │   ├── KenzoMascot.tsx
│   │   ├── landing/
│   │   ├── review/
│   │   └── review-mode/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── app.tsx
│   │   └── review.tsx
│   │
│   └── styles.css
│
├── package.json
├── vite.config.ts
└── README.md
