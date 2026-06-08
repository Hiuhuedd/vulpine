import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, phone, email, service, description, budget } = body;

    if (!fullName || !phone || !email || !description) {
      return NextResponse.json(
        { error: 'Missing required fields (Name, Phone, Email, Description).' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${fullName} via Vulpine Web" <${process.env.SMTP_USER}>`,
      to: 'vulpineltd@gmail.com',
      replyTo: email,
      subject: `New Vulpine Construction Inquiry: ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E0E8D8; border-top: 4px solid #004E3F;">
          <h2 style="color: #004E3F; font-family: serif; border-bottom: 1px solid #A4CE31; padding-bottom: 10px;">New Construction Inquiry</h2>
          <p style="font-size: 14px; color: #555;">You have received a new contact submission from the Vulpine Limited website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #666; border-bottom: 1px solid #eee;">Full Name:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Company Name:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #eee;">${companyName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Phone Number:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Email Address:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Service Interested In:</td>
              <td style="padding: 8px 0; color: #004E3F; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eee;">Budget Range:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #eee;">${budget || 'N/A'}</td>
            </tr>
          </table>

          <div style="margin-top: 25px;">
            <h4 style="color: #004E3F; margin-bottom: 8px;">Project Scope & Description:</h4>
            <div style="background-color: #F9FAFB; padding: 15px; border-left: 3px solid #A4CE31; font-size: 13px; line-height: 1.6; color: #333; white-space: pre-wrap;">
              ${description}
            </div>
          </div>

          <footer style="margin-top: 30px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 10px; text-align: center;">
            This email was generated automatically from the Vulpine Limited website portal.
          </footer>
        </div>
      `,
    };

    // 1. Send notification to Vulpine Admin
    await transporter.sendMail(mailOptions);

    // 2. Send Auto-Responder to the Client
    const clientMailOptions = {
      from: process.env.SMTP_FROM || `Vulpine Limited <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Inquiry Received: Vulpine Limited`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E0E8D8; border-top: 4px solid #004E3F;">
          <h2 style="color: #004E3F; font-family: serif; border-bottom: 1px solid #A4CE31; padding-bottom: 10px;">Inquiry Received</h2>
          <p style="font-size: 14px; color: #333;">Dear ${fullName},</p>
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Thank you for contacting Vulpine Limited regarding <strong>${service}</strong>. 
            We have successfully received your inquiry and our technical team is currently reviewing your project details.
          </p>
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            One of our representatives will get back to you shortly at the phone number (${phone}) or email provided.
          </p>
          <p style="font-size: 14px; color: #555; line-height: 1.6; margin-top: 30px;">
            Best Regards,<br/>
            <strong>Vulpine Limited</strong><br/>
            <span style="font-size: 12px; color: #888;">Design, Construction and Maintenance of Natural and Built Environment</span>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(clientMailOptions);

    return NextResponse.json({ message: 'Inquiry email sent successfully.' });
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send inquiry email.' },
      { status: 500 }
    );
  }
}
