import { google } from 'googleapis'

export async function POST(req: Request) {
  try {
    const { name, email, whatsapp, companyName } = await req.json()

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' }),
          name,
          email,
          whatsapp,
          companyName,
        ]],
      },
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('save-lead error:', err)
    return Response.json({ success: false }, { status: 500 })
  }
}
