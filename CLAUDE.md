# Interactive Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for **Raymond Borja** — Civil Engineer transitioning into AI Automation. Primary goal: attract clients who need AI chatbots, workflow automation, and business process automation services.

**Live file:** `index.html` (single-file, no build step required)

---

## Owner — Resume Data

**Name:** Raymond Borja  
**Title:** Civil Engineer | AI Automation Specialist | Workflow Automation Developer  
**Location:** Philippines  
**Email:** Raymondborja21@gmail.com  
**Phone:** +63 927-066-4056  
**LinkedIn:** https://www.linkedin.com/in/raymond-borja-2bb4a5255/

### Summary
Results-driven Civil Engineer transitioning into AI Automation and Workflow Development. 10+ years engineering and project management experience. Builds AI chatbots, workflow automations, appointment setter systems, and AI receptionist solutions using n8n, Make.com, Zapier, OpenAI APIs, Google Workspace, Meta integrations, and webhook automation.

### Skills
**AI & Automation:** n8n, Make.com, Zapier, AI Chatbot Development, AI Receptionist Systems, OpenAI/ChatGPT API, Prompt Engineering, API Integrations, Webhooks, CRM Automation, Lead Generation Automation  
**Platforms:** Google Calendar API, Google Sheets, Gmail Automation, Facebook Messenger, Instagram DM, Meta Webhooks, HTTP Requests, JSON Handling, REST APIs  
**Technical:** Workflow Design, Process Automation, Data Mapping, Error Handling, Filters & Conditions, Branching Logic, AI Agent Integration, Automation Architecture  
**Engineering & PM:** Project Management, Construction Management, Billing Documentation, Quality Inspection, AutoCAD, MS Project, Bluebeam, Planswift  
**Languages:** English, Filipino

### Certifications
- AI Automation with n8n — Technical Virtual Assistants PH (April 29, 2026)
- No Code Automation with Make.com — Technical Virtual Assistants PH (April 3, 2026)
- No Code Automation with Zapier — Technical Virtual Assistants PH (March 28, 2026)
- BS Civil Engineering — Licensed Civil Engineer, Philippines

### Experience
**AI Automation Specialist** | Freelance | 2026–Present  
AI chatbots, appointment setter systems, lead gen pipelines, Meta integrations, Google Workspace automation

**Project Manager / Civil Engineer** | Various Construction Projects, Philippines | 2014–Present  
Major projects: Buliluyan Port (Bataraza, Palawan), Babuyan Bridge (Puerto Princesa), Tanatanaen Bridge (Dumaran), 4-Storey Hotel, Solar Street Light Projects, Commercial & Residential Buildings

### Projects (AI Automation)
1. **AI Dental Clinic Receptionist & Appointment Setter** — n8n + OpenAI + Google Calendar + Google Sheets + Facebook Messenger + Gmail
2. **Facebook & Instagram AI Chatbot** — Auto-reply, lead capture, follow-ups, CRM logging via Meta Webhooks
3. **AI Lead Generation Automation** — Lead capture, qualification, automated responses, Google Sheets/CRM integration

### Services Offered
AI Workflow Automation · AI Chatbot Development · AI Receptionist Setup · Appointment Setter Automation · Business Process Automation · API Integration Services

---

## Committed Aesthetic

**Mode:** Dark Developer / Builder  
**Palette:** `#080809` base · `#00d4ff` cyan accent · `#ff6b47` coral secondary  
**Fonts:** Syne (display, weight 700–800) · Outfit (body) · JetBrains Mono (labels/code)  
**Motion:** CSS scroll-reveal (`.rev` → `.in`), staggered delays, hero stagger animations  
**Texture:** SVG noise overlay via `body::after`, subtle CSS grid on hero and project visuals

---

## Design Rules (Non-Negotiable)

- **Never use:** Inter, Roboto, Arial, Space Grotesk, system fonts
- **Never use:** purple gradients on white, generic SaaS card patterns, predictable centered layouts
- CSS custom properties for all tokens — `--cyan`, `--coral`, `--black`, `--s1/s2/s3`, `--border`, `--txt/txt2/txt3`
- Scroll reveal via IntersectionObserver — class `.rev` becomes `.in` when entering viewport
- Delay classes: `.d1` (0.1s), `.d2` (0.2s), `.d3` (0.3s), `.d4` (0.4s)
- Backgrounds: grid patterns, glow orbs, noise overlay — no flat solid color sections
- Cyan (`#00d4ff`) for primary interactive elements; coral (`#ff6b47`) for dates and type labels

---

## Content Rules

- **Source of truth:** Resume data section above — do not invent companies, certifications, or achievements
- If content is missing, insert `<!-- TODO: [description] -->` rather than fabricating
- Copy tone: confident, professional, client-focused — never generic or buzzword-heavy
- Section order: 01 About · 02 Skills · 03 Services · 04 Experience · 05 Certifications · 06 Projects · 07 Contact

---

## File Structure

```
Interactive Portfolio/
├── index.html              ← complete portfolio (single file, open directly in browser)
├── CLAUDE.md               ← this file (source of truth for content + design rules)
├── Front-end-skill.md      ← frontend design skill reference
├── Taste-skill.md          ← brand identity & taste reference
└── Resume AI Automation.pdf
```

---

## Implementation Notes

- All styles embedded in `<style>` — keep class names short (not BEM, utility-adjacent)
- No build step, no npm, no framework — pure HTML/CSS/JS
- Open `index.html` directly in a browser to preview
- Adding sections: follow `sh-num rev` + section grid pattern already established
