import { NextRequest, NextResponse } from "next/server";
import { MailtrapClient } from "mailtrap";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    website: z.string().url().optional().or(z.literal("")),
    message: z.string().min(10),
    turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = formSchema.parse(body);

        // Verify Turnstile token
        const turnstileResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    secret: process.env.TURNSTILE_SECRET_KEY,
                    response: data.turnstileToken,
                }),
            }
        );

        const turnstileResult = await turnstileResponse.json();
        if (!turnstileResult.success) {
            console.error("Turnstile verification failed:", turnstileResult);
            return NextResponse.json(
                { error: "Invalid verification token" },
                { status: 400 }
            );
        }

        const mailtrap = new MailtrapClient({
            token: process.env.MAILTRAP_API_TOKEN!,
        });

        const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #18181b;">New Contact Form Submission</h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #71717a;">You've received a new message from your website.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="border-top: 1px solid #e4e4e7;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px;">
                    <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Name</p>
                          <p style="margin: 0; font-size: 16px; color: #18181b;">${data.name}</p>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Email</p>
                          <p style="margin: 0; font-size: 16px;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></p>
                        </td>
                      </tr>
                    </table>
                    ${data.website ? `
                    <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Website</p>
                          <p style="margin: 0; font-size: 16px;"><a href="${data.website}" style="color: #3b82f6; text-decoration: none;">${data.website}</a></p>
                        </td>
                      </tr>
                    </table>
                    ` : ''}
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Message</p>
                          <div style="background-color: #f4f4f5; border-radius: 6px; padding: 16px;">
                            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #18181b; white-space: pre-wrap;">${data.message}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 40px 40px;">
                    <div style="border-top: 1px solid #e4e4e7; padding-top: 20px;">
                      <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">
                        Sent from oliverdave.dev contact form on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

        await mailtrap.send({
            from: { email: "noreply@oliverdave.dev", name: "Oliver Dave" },
            to: [{ email: "contact@oliverdave.dev" }],
            subject: "New Contact Form Submission",
            html: emailBody,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
