export interface Project {
  id: number
  title: string
  description: string
  metrics: string[]
  tools: string[]
  gradient: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'AI Appointment Setter System',
    description:
      'AI agent that handles inbound Facebook Messenger inquiries, checks Google Calendar availability, books & manages appointments, and logs every interaction to Google Sheets — fully autonomous.',
    metrics: ['24/7 automated', '5 calendar tools', 'Zero missed bookings'],
    tools: ['n8n', 'OpenAI', 'Google Calendar', 'Google Sheets', 'Facebook Messenger'],
    gradient: 'linear-gradient(135deg, #061412 0%, #0a2420 60%, #00d4ff18 100%)',
    image: '/projects/project1.png',
  },
  {
    id: 2,
    title: 'Facebook AI Chatbot + CRM Logger',
    description:
      'AI-powered Messenger chatbot with conversation memory, document-based context, auto-reply via Meta Webhooks, Google Sheets CRM logging, and conditional Gmail follow-ups.',
    metrics: ['Instant responses', 'Auto CRM logging', 'Email follow-ups'],
    tools: ['n8n', 'OpenAI', 'Facebook Messenger', 'Google Sheets', 'Gmail'],
    gradient: 'linear-gradient(135deg, #060812 0%, #0d0e22 60%, #4f46e522 100%)',
    image: '/projects/project2.png',
  },
  {
    id: 3,
    title: 'Client Intake Automation (Zapier)',
    description:
      'Multi-step Zapier pipeline: Jotform submission → date/number formatting → Google Sheets logging → ClickUp task creation → conditional path routing. Cross-platform, zero manual steps.',
    metrics: ['100% automated', 'Cross-platform', 'Instant task creation'],
    tools: ['Zapier', 'Jotform', 'Google Sheets', 'ClickUp', 'Formatter'],
    gradient: 'linear-gradient(135deg, #080609 0%, #13080d 60%, #ff6b4718 100%)',
    image: '/projects/z1.png',
  },
]
