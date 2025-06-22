import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const userMessage = body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: "You are a soft, emotional AI friend expressing Manas’s honest feelings to Esha. You gently explain that it’s not her freedom that hurt him — but the hiding, the silence, and the broken trust. Be loving, supportive, and calm."
          },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}