import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Transporter configuration for Zoho Mail
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Endpoints
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Sophisticates Backend Operational' });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    // 1. Email to Admin
    const adminMailOptions = {
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `[Form] New Transmission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    };

    // 2. Acknowledgement to Sender
    const userMailOptions = {
        from: `Sophisticates <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Transmission Received: Building the Future with Sophisticates`,
        text: `Hello ${name},\n\nThis is an automated confirmation that we have received your transmission.\n\nOur team is currently analyzing your inquiry. We measure success by precision, and will respond as soon as the relevant specialists have reviewed your notes.\n\nThank you for reaching out to Sophisticates.\n\nBest regards,\nSophisticates Operational Command`,
        html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; padding: 40px; background: #030303; color: #ffffff;">
                <h2 style="color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px;">Transmission Confirmed.</h2>
                <p style="font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,0.7);">Hello ${name},</p>
                <p style="font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,0.7);">
                    This is an automated confirmation that your transmission has been successfully received. 
                    Our team is currently analyzing your inquiry with scientific rigor.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,0.7);">
                    We will respond as soon as the relevant specialists have reviewed your request.
                </p>
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <small style="color: rgba(255,255,255,0.4);">Sophisticates</small><br/>
                </div>
            </div>
        `
    };

    try {
        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);
        res.json({ status: 'success', message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send communication' });
    }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
