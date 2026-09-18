export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Simple in-memory rate limiting: max 5 requests per 15 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '') // strip basic HTML brackets
    .trim();
}

export async function processContactSubmission(
  payload: ContactPayload,
  clientIp: string = '127.0.0.1'
): Promise<{ status: number; body: ContactResponse }> {
  // 1. Honeypot spam check
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    // Silently drop bots or return fake success
    return {
      status: 200,
      body: {
        success: true,
        message: "Message sent successfully."
      }
    };
  }

  // 2. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      body: {
        success: false,
        message: "Too many requests. Please wait a few minutes before trying again or email me directly at akverma834001@gmail.com."
      }
    };
  }

  // 3. Validation
  const name = sanitizeInput(payload.name);
  const email = sanitizeInput(payload.email);
  const subject = sanitizeInput(payload.subject);
  const message = sanitizeInput(payload.message);
  const phone = payload.phone ? sanitizeInput(payload.phone) : undefined;

  if (!name || name.length < 2 || name.length > 100) {
    return {
      status: 400,
      body: { success: false, message: "Please enter a valid name (2-100 characters)." }
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email) || email.length > 150) {
    return {
      status: 400,
      body: { success: false, message: "Please enter a valid email address." }
    };
  }

  if (!subject || subject.length < 3 || subject.length > 200) {
    return {
      status: 400,
      body: { success: false, message: "Subject must be between 3 and 200 characters." }
    };
  }

  if (!message || message.length < 10 || message.length > 3000) {
    return {
      status: 400,
      body: { success: false, message: "Message must be between 10 and 3000 characters." }
    };
  }

  const submissionDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const recipientEmail = process.env.CONTACT_EMAIL || "akverma834001@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  // 4. Dispatch Email if RESEND_API_KEY is available
  if (resendApiKey) {
    try {
      const emailBody = `
New Portfolio Query from ${name}

Name: ${name}
Email: ${email}
Subject: ${subject}
Phone: ${phone || 'Not provided'}
Submitted: ${submissionDate} (IST)

Message:
${message}
      `.trim();

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Portfolio Query <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: email, // Preserves visitor's email for 1-click reply!
          subject: `[Portfolio Query] ${subject} - from ${name}`,
          text: emailBody
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        console.error("Resend API error:", errJson);
        throw new Error("Failed to dispatch email via Resend.");
      }

      return {
        status: 200,
        body: {
          success: true,
          message: "Message sent successfully. Thanks for reaching out. I'll get back to you as soon as possible."
        }
      };
    } catch (err: any) {
      console.error("Email dispatch failed:", err);
      return {
        status: 500,
        body: {
          success: false,
          message: "Unable to deliver email at this moment. Please email me directly at akverma834001@gmail.com."
        }
      };
    }
  }

  // 5. Development simulation when running without RESEND_API_KEY
  console.log("=========================================");
  console.log("📬 NEW PORTFOLIO QUERY RECEIVED (DEV LOG)");
  console.log(`To: ${recipientEmail}`);
  console.log(`Reply-To: ${email}`);
  console.log(`From: ${name} <${email}>`);
  if (phone) console.log(`Phone: ${phone}`);
  console.log(`Subject: ${subject}`);
  console.log(`Timestamp: ${submissionDate}`);
  console.log(`Message:\n${message}`);
  console.log("=========================================");

  return {
    status: 200,
    body: {
      success: true,
      message: "Message sent successfully. Thanks for reaching out. I'll get back to you as soon as possible."
    }
  };
}
