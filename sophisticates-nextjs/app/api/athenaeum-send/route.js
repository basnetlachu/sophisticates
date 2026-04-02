import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';

const brandedEmail = ({ heading, body, footer = '' }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${heading}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f8f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f8;padding:60px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background-color:#ffffff;border:1px solid #eaeaec;border-radius:6px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03);">
          <tr>
            <td style="padding:40px 40px 30px 40px;text-align:center;border-bottom:1px solid #f2f2f2;">
              <div style="display:inline-block;padding:4px;border:1px solid #eeeeee;border-radius:50%;margin-bottom:18px;">
                <img src="https://sophisticatesai.com/sophisticates.png" alt="Sophisticates" width="44" height="44" style="display:block;border-radius:50%;filter:invert(1);" />
              </div>
              <h2 style="margin:0;font-size:10px;letter-spacing:0.35em;color:#888888;text-transform:uppercase;font-weight:600;">SOPHISTICATES</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:45px 40px 40px 40px;background-color:#ffffff;">
              <h1 style="margin:0 0 24px 0;font-size:22px;font-weight:400;color:#0a0a0a;letter-spacing:-0.01em;line-height:1.4;">${heading}</h1>
              <div style="font-size:15px;color:#444444;line-height:1.7;">${body}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px 40px 40px;text-align:center;background-color:#fafafa;border-top:1px solid #f2f2f2;">
              ${footer ? `<div style="margin-bottom:30px;">${footer}</div>` : ''}
              <p style="margin:0 0 6px 0;font-size:9px;color:#888888;letter-spacing:0.25em;text-transform:uppercase;">CLARITY IN COMPLEXITY</p>
              <a href="https://sophisticatesai.com" style="margin:0;font-size:11px;color:#666666;text-decoration:none;">sophisticatesai.com</a>
            </td>
          </tr>
        </table>
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;">
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:10px;color:#aaaaaa;line-height:1.5;">This transmission was sent from the Sophisticates automated platform.<br>Please do not reply directly to this notification.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(request) {
  const { userEmail, messages } = await request.json();

  if (!userEmail || !Array.isArray(messages) || !messages.length) {
    return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
  }

  if (!process.env.NVIDIA_API_KEY) {
    return NextResponse.json({ status: 'error', message: 'AI service not configured.' }, { status: 503 });
  }

  const nvidia = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  });

  const conversationText = messages
    .map(m => `${m.role === 'user' ? 'User' : 'Athenaeum'}: ${m.content}`)
    .join('\n\n');

  let emailDraft = {
    subject: `User Inquiry via Athenaeum — ${userEmail}`,
    body: '<p>A user reached out via Athenaeum with a query that could not be fully resolved. Please see the conversation below and follow up with them directly.</p>'
  };

  try {
    const draftResponse = await nvidia.chat.completions.create({
      model: 'moonshotai/kimi-k2-instruct',
      messages: [
        {
          role: 'system',
          content: `You are an email drafting assistant. Based on the chat conversation provided, write a concise formal inquiry email FROM the user TO the Sophisticates team. The email should summarize the user's unresolved question or request clearly and professionally. Output ONLY a valid JSON object with exactly two keys: "subject" (string, under 80 chars) and "body" (HTML string using <p> tags, under 200 words). Do not include greetings to the user — this email is addressed to the Sophisticates team.`
        },
        {
          role: 'user',
          content: `Draft an inquiry email to Sophisticates based on this conversation:\n\n${conversationText}`
        }
      ],
      max_tokens: 600,
      temperature: 0.4,
    });

    const raw = draftResponse.choices[0]?.message?.content || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) emailDraft = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.warn('Email draft generation failed, using fallback:', err.message);
  }

  const safeConversation = conversationText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const adminHtml = brandedEmail({
    heading: emailDraft.subject,
    body: `
          ${emailDraft.body}
          <div style="margin-top:24px;padding:16px 20px;background:#f9f9f9;border:1px solid #eeeeee;border-radius:4px;">
            <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">Reply to</span>
            <p style="margin:6px 0 0;font-size:15px;color:#0a0a0a;font-weight:500;">${userEmail}</p>
          </div>
          <p style="margin:20px 0 0;font-size:12px;color:#888888;">— Full conversation below —</p>
          <div style="font-size:12px;color:#666666;line-height:1.8;white-space:pre-wrap;font-family:monospace;background:#f9f9f9;padding:16px;border:1px solid #eeeeee;margin-top:12px;">${safeConversation}</div>`
  });

  const userHtml = brandedEmail({
    heading: 'Your query has been sent.',
    body: `
          <p style="font-size:15px;color:#333333;line-height:1.85;margin:0 0 18px 0;">
            Your inquiry has been forwarded to the Sophisticates team via Athenaeum. They will review it and reach back out to you at <strong>${userEmail}</strong>.
          </p>
          <p style="font-size:15px;color:#666666;line-height:1.85;margin:0 0 24px 0;">
            In the meantime, explore our work at <a href="https://sophisticatesai.com" style="color:#0a0a0a;text-decoration:none;border-bottom:1px solid #cccccc;">sophisticatesai.com</a>.
          </p>`,
    footer: `<a href="https://sophisticatesai.com" style="display:inline-block;padding:14px 32px;background-color:#0a0a0a;color:#ffffff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;font-weight:600;border-radius:2px;">EXPLORE SOPHISTICATES</a>`
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: userEmail,
        subject: `[Athenaeum] ${emailDraft.subject}`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Query Received — Sophisticates`,
        html: userHtml
      })
    ]);
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Athenaeum email send error:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
  }
}
