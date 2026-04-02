import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isValidOrigin } from '../../../lib/security';

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
  if (!isValidOrigin(request)) {
    return NextResponse.json({ status: 'error', message: 'Forbidden' }, { status: 403 });
  }

  const { name, businessName, email, country, message, turnstileToken } = await request.json();

  if (!name || !email || !message || !businessName || !country) {
    return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
  }

  // Verify Turnstile token
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  });
  const verifyResult = await verify.json();
  if (!verifyResult.success) {
    return NextResponse.json({ status: 'error', message: 'Security check failed. Please try again.' }, { status: 400 });
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
    return NextResponse.json({ status: 'success', message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to send communication' }, { status: 500 });
  }
}
