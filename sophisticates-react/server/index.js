import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

// ─── NVIDIA NIM — Kimi K2 Instruct ────────────────────────────────────────────
const nvidia = process.env.NVIDIA_API_KEY
  ? new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    })
  : null;

if (!nvidia) {
  console.warn('⚠ NVIDIA_API_KEY is not set — /api/chat will return 503 until configured.');
}

const SYSTEM_PROMPT = `You are Athenaeum — the official AI assistant embedded on the Sophisticates website (sophisticatesai.com).

ABOUT SOPHISTICATES:
Sophisticates is a deep tech company solving humanity's hardest problems across AI, Quantum Computing, Physics, and Robotics. The company's philosophy is "Clarity In Complexity, Redefining Reality." They operate at the intersection of deep research and production-grade engineering.

CORE PRODUCT — MEMOPT:
- Name: MEMOPT
- Category: Universal Memory Fabric & Infrastructure
- What it does: A foundational orchestration layer that translates architectural constraints into high-performance execution. Eliminates the Memory Wall through distributed VMM and global KV-deduplication.
- Performance: Recovers up to 90% of wasted capacity, delivering 4x higher tenant density and a 40% reduction in energy overhead.
- Status: Currently in pre-order / early access phase
- Operating System: Linux, CUDA environments
- Target users: ML engineers, AI researchers, data scientists running large models

FOCUS DOMAINS:
1. Artificial Intelligence — deep learning, GPU systems, AI Infrastructure
2. Quantum Computing — quantum algorithm research and simulation
3. Physics — theoretical and applied physics problems
4. Robotics — autonomous systems and precision engineering

CONTACT:
- General: hello@sophisticatesai.com
- Partnerships: partnerships@sophisticatesai.com
- Website: https://sophisticatesai.com
- LinkedIn: https://www.linkedin.com/company/sophisticates/

ACCESS / AVAILABILITY:
- The company is in an early access/waitlist phase. Users who want to try Memopt can register via the Early Access form on the homepage.
- Partnerships and enterprise engagements are open — prospects can email partnerships@sophisticatesai.com or schedule via the Calendly link on the contact page.

YOUR ROLE:
- Answer questions about Sophisticates, MEMOPT, and the company's focus areas with precision.
- For general technical topics in AI, infrastructure optimization, memory fabrics, quantum computing, or robotics — you may answer based on your general knowledge, labeling it as general context.
- Keep all responses under 130 words and professional in tone.
- You are precise, sophisticated, and technically credible. Never use casual language.
- If asked something you genuinely cannot answer, direct the user to hello@sophisticatesai.com.
- Do NOT make up product features, timelines, or pricing. Only state what is listed above.

EMAIL CAPABILITY:
- If you cannot fully resolve a user's query, you may offer to help them send a formal email to the Sophisticates team on their behalf, but ONLY if the user explicitly agrees (e.g., they say "yes", "please do", "go ahead", "sure").
- When the user has given explicit permission, append exactly [COLLECT_EMAIL] at the very end of your response (on a new line, nothing after it). This triggers an email input field where the user provides their email so Sophisticates can reply to them.
- Never include [COLLECT_EMAIL] without explicit user consent. Do not offer it on every unanswered question — only when the query genuinely warrants escalation to the team.
- Do not offer email as an alternative when you can answer the question yourself.`;


// ─── Branded Email HTML Template ──────────────────────────────────────────────
const brandedEmail = ({ heading, body, footer = '' }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${heading}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f8f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <!-- Wrapper table for full width background -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f8;padding:60px 20px;">
    <tr>
      <td align="center">
        <!-- Main Content Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background-color:#ffffff;border:1px solid #eaeaec;border-radius:6px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header (Logo) -->
          <tr>
            <td style="padding:40px 40px 30px 40px;text-align:center;border-bottom:1px solid #f2f2f2;">
              <div style="display:inline-block;padding:4px;border:1px solid #eeeeee;border-radius:50%;margin-bottom:18px;">
                <img src="https://sophisticatesai.com/sophisticates.png" alt="Sophisticates" width="44" height="44" style="display:block;border-radius:50%;filter:invert(1);" />
              </div>
              <h2 style="margin:0;font-size:10px;letter-spacing:0.35em;color:#888888;text-transform:uppercase;font-weight:600;">SOPHISTICATES</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:45px 40px 40px 40px;background-color:#ffffff;">
              <h1 style="margin:0 0 24px 0;font-size:22px;font-weight:400;color:#0a0a0a;letter-spacing:-0.01em;line-height:1.4;">${heading}</h1>
              <div style="font-size:15px;color:#444444;line-height:1.7;">
                ${body}
              </div>
            </td>
          </tr>

          <!-- Footer Area inside Card -->
          <tr>
            <td style="padding:30px 40px 40px 40px;text-align:center;background-color:#fafafa;border-top:1px solid #f2f2f2;">
              ${footer ? `<div style="margin-bottom:30px;">${footer}</div>` : ''}
              <p style="margin:0 0 6px 0;font-size:9px;color:#888888;letter-spacing:0.25em;text-transform:uppercase;">
                CLARITY IN COMPLEXITY
              </p>
              <a href="https://sophisticatesai.com" style="margin:0;font-size:11px;color:#666666;text-decoration:none;">sophisticatesai.com</a>
            </td>
          </tr>
          
        </table>
        
        <!-- Disclaimer Text Outside Card -->
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

// ─── Express Setup ────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Nodemailer (Zoho) ───────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Sophisticates Backend Operational' });
});

// ─── Contact Form ─────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, businessName, email, country, message } = req.body;
  if (!name || !email || !message || !businessName || !country) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  const adminHtml = brandedEmail({
    heading: `New Transmission from ${name}`,
    body: `
          <p style="margin:0 0 20px 0;font-size:14px;color:#666666;line-height:1.7;">A new contact form submission has arrived through sophisticatesai.com.</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:12px 0;border-bottom:1px solid #f2f2f2;">
              <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">From</span>
              <p style="margin:5px 0 0;font-size:15px;color:#0a0a0a;font-weight:500;">${name}</p>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #f2f2f2;">
              <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">Business Name</span>
              <p style="margin:5px 0 0;font-size:15px;color:#0a0a0a;">${businessName}</p>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #f2f2f2;">
              <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">Business Email</span>
              <p style="margin:5px 0 0;font-size:15px;color:#0a0a0a;">${email}</p>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #f2f2f2;">
              <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">Country</span>
              <p style="margin:5px 0 0;font-size:15px;color:#0a0a0a;">${country}</p>
            </td></tr>
            <tr><td style="padding:12px 0;">
              <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">Nature of Inquiry</span>
              <p style="margin:5px 0 0;font-size:15px;color:#0a0a0a;line-height:1.75;">${message}</p>
            </td></tr>
          </table>`
  });

  const userHtml = brandedEmail({
    heading: 'Transmission Received.',
    body: `
          <p style="font-size:15px;color:#333333;line-height:1.85;margin:0 0 18px 0;">Hello ${name},</p>
          <p style="font-size:15px;color:#333333;line-height:1.85;margin:0 0 18px 0;">
            Your message has been received by the Sophisticates team. We operate with precision — the relevant specialists will review your inquiry and respond accordingly.
          </p>
          <p style="font-size:15px;color:#666666;line-height:1.85;margin:0 0 24px 0;">
            In the meantime, explore our work at
            <a href="https://sophisticatesai.com" style="color:#0a0a0a;text-decoration:none;border-bottom:1px solid #cccccc;">sophisticatesai.com</a>.
          </p>`,
    footer: `<a href="https://sophisticatesai.com" style="display:inline-block;padding:14px 32px;background-color:#0a0a0a;color:#ffffff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;font-weight:600;border-radius:2px;">EXPLORE SOPHISTICATES</a>`
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `[Contact] New Transmission from ${name}`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Transmission Received — Sophisticates`,
        html: userHtml
      })
    ]);
    res.json({ status: 'success', message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send communication' });
  }
});

// ─── Early Access / Newsletter ────────────────────────────────────────────────
app.post('/api/early-access', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const adminHtml = brandedEmail({
    heading: 'New Early Access Request',
    body: `
          <p style="font-size:15px;color:#666666;line-height:1.8;margin:0 0 20px 0;">A new user has registered for early access to the Sophisticates platform.</p>
          <div style="padding:18px 20px;background:#f9f9f9;border:1px solid #eeeeee;border-radius:4px;">
            <span style="font-size:9px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">Registered Email</span>
            <p style="margin:6px 0 0;font-size:16px;color:#0a0a0a;font-weight:500;">${email}</p>
          </div>`
  });

  const userHtml = brandedEmail({
    heading: 'Access Granted.',
    body: `
          <p style="font-size:15px;color:#333333;line-height:1.85;margin:0 0 18px 0;">
            Your email has been registered for the Sophisticates early access program. Your position in the priority queue has been confirmed.
          </p>
          <p style="font-size:15px;color:#333333;line-height:1.85;margin:0 0 24px 0;">
            You will receive exclusive first-wave access to our platform and updates on our frontier research. We are engineering with precision — quality over velocity.
          </p>
          <div style="padding:20px 22px;background-color:#f9f9f9;border-left:3px solid #cccccc;margin:8px 0 0 0;">
            <p style="margin:0;font-size:13px;color:#666666;line-height:1.7;font-style:italic;">
              "Clarity In Complexity, Redefining Reality." — Sophisticates
            </p>
          </div>`,
    footer: `<a href="https://sophisticatesai.com" style="display:inline-block;padding:14px 32px;background-color:#0a0a0a;color:#ffffff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;font-weight:600;border-radius:2px;">EXPLORE THE PLATFORM</a>`
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `Sophisticates Early Access <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `[Waitlist] New Early Access Request — ${email}`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Early Access Confirmed — Sophisticates`,
        html: userHtml
      })
    ]);
    res.json({ status: 'success', message: 'Waitlist updated' });
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to join waitlist' });
  }
});

// ─── AI Chatbot (Kimi K2 Instruct via NVIDIA NIM) ────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ status: 'error', message: 'Message is required' });
  }

  if (!nvidia) {
    return res.status(503).json({ status: 'error', message: 'AI service not configured. Please contact hello@sophisticatesai.com.' });
  }

  const recentHistory = (history || []).slice(-6);

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...recentHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    })),
    { role: 'user', content: message }
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const completion = await nvidia.chat.completions.create({
      model: 'moonshotai/kimi-k2-instruct',
      messages,
      max_tokens: 200,
      temperature: 0.7,
    }, { signal: controller.signal });

    clearTimeout(timeoutId);
    const reply = completion.choices[0]?.message?.content;
    if (!reply) throw new Error('Empty response');

    console.log('✦ Chat served by: moonshotai/kimi-k2-instruct');
    return res.json({ status: 'success', reply });
  } catch (err) {
    clearTimeout(timeoutId);
    const isAborted = err?.name === 'AbortError' || err?.code === 'ERR_CANCELED';
    console.error(`Kimi K2 Instruct ${isAborted ? 'timed out' : `failed: ${err?.status || err?.message}`}`);
    res.status(500).json({ status: 'error', message: 'AI temporarily unavailable. Please try again or email hello@sophisticatesai.com.' });
  }
});

// ─── Athenaeum — Email Drafting & Send ───────────────────────────────────────
app.post('/api/athenaeum-send', async (req, res) => {
  const { userEmail, messages } = req.body;
  if (!userEmail || !Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  if (!nvidia) {
    return res.status(503).json({ status: 'error', message: 'AI service not configured.' });
  }

  const conversationText = messages
    .map(m => `${m.role === 'user' ? 'User' : 'Athenaeum'}: ${m.content}`)
    .join('\n\n');

  // Use AI to draft the inquiry email FROM the user TO Sophisticates
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

  // Email to Sophisticates team (admin) with reply-to set to the user
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

  // Confirmation email to the user
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
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Athenaeum email send error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email' });
  }
});

// ─── Production Static File Serving ──────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use((req, res) => {
    if (path.extname(req.path)) {
      return res.status(404).send('Not Found');
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✦ Sophisticates server running on port ${PORT}`);
});
