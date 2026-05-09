# Raymond Borja — Interactive AI Portfolio

An AI-powered interactive portfolio built with Next.js 15, Vercel AI SDK, and Framer Motion. Chat directly with Raymond's AI avatar to learn about his automation work, projects, and services.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and add your API key
cp .env.local.example .env.local
# → Edit .env.local and add your OPENAI_API_KEY

# 3. Run dev server
npm run dev
# → Open http://localhost:3000
```

---

## Add Your Project Screenshots

Drop screenshots into `/public/projects/`:

```
public/
└── projects/
    ├── project1.png   ← AI Dental Clinic Receptionist
    ├── project2.png   ← Facebook & Instagram AI Chatbot
    └── project3.png   ← AI Lead Generation Pipeline
```

If images are missing, the gradient fallback backgrounds display automatically.

---

## Switch to Groq (Faster + Free Tier)

Install the Groq SDK:
```bash
npm install @ai-sdk/groq
```

Update `app/api/chat/route.ts`:
```typescript
import { createGroq } from '@ai-sdk/groq'
const groq = createGroq()

// Replace the model line:
model: groq('llama-3.1-70b-versatile'),
```

Set your env variable:
```
GROQ_API_KEY=your_groq_api_key_here
```

---

## Customise

| What | Where |
|---|---|
| AI personality & resume data | `lib/prompt.ts` |
| Project cards content | `lib/projects.ts` |
| Avatar appearance | `components/Avatar.tsx` |
| Suggestion chips | `components/SuggestionChips.tsx` |
| Color tokens | `app/globals.css` (`:root` block) |
| Fonts | `app/layout.tsx` |
| Add Calendly link | `lib/prompt.ts` → "Book a free strategy call" |

---

## Deploy to Vercel

```bash
# Push to GitHub, then:
vercel deploy
# → Add OPENAI_API_KEY in Vercel project settings → Environment Variables
```

---

## Tech Stack

- **Next.js 15** (App Router, Edge runtime)
- **Vercel AI SDK v4** — streaming chat
- **Framer Motion** — avatar + UI animations
- **Syne + Outfit + JetBrains Mono** — typography
- **Tailwind CSS** — utility styles
- **Canvas API** — rainbow mouse trail + click splash
