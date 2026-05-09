import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { z } from 'zod'
import { SYSTEM_PROMPT } from '@/lib/prompt'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.82,
    maxTokens: 900,
    maxSteps: 3,
    tools: {
      saveLead: tool({
        description: 'Save the collected contact information to Google Sheets. Call this ONLY after you have gathered ALL four fields: full name, email, WhatsApp number, and company name.',
        parameters: z.object({
          name: z.string().describe('Full name of the lead'),
          email: z.string().describe('Email address'),
          whatsapp: z.string().describe('WhatsApp number'),
          companyName: z.string().describe('Company or business name'),
        }),
        execute: async ({ name, email, whatsapp, companyName }) => {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
            const res = await fetch(`${baseUrl}/api/save-lead`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, whatsapp, companyName }),
            })
            const data = await res.json()
            return data.success
              ? 'Lead saved successfully to Google Sheets.'
              : 'Could not save to Google Sheets right now.'
          } catch {
            return 'Could not save to Google Sheets right now.'
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}
