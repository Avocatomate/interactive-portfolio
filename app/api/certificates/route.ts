import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'Raymond_Borja_References.pdf')
  const fileBuffer = readFileSync(filePath)

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Raymond_Borja_References.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
