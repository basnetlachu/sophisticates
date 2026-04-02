import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ status: 'error', message: 'Email is required' }, { status: 400 });
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
    return NextResponse.json({ status: 'success', message: 'Waitlist updated' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to join waitlist' }, { status: 500 });
  }
}
