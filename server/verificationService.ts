import crypto from 'crypto';

export interface VerificationSession {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  emailOtp: string;
  phoneOtp: string;
  createdAt: number;
  expiresAt: number;
  emailVerified: boolean;
  phoneVerified: boolean;
}

// In-memory verification sessions store
const sessionsMap = new Map<string, VerificationSession>();

// In-memory valid tickets (single-use tokens allowing a comment to be posted)
export const validTicketsMap = new Map<string, { email: string; phone: string; name: string; expiresAt: number }>();

const SECRET_KEY = process.env.OTP_SECRET || 'abhishek-portfolio-crypto-secret-2026';

export function createSignedTicket(data: { email: string; phone: string; name: string; expiresAt: number }): string {
  const jsonStr = JSON.stringify(data);
  const base64Data = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(base64Data).digest('base64url');
  return `${base64Data}.${signature}`;
}

export function verifySignedTicket(ticket: string): { email: string; phone: string; name: string; expiresAt: number } | null {
  if (!ticket || typeof ticket !== 'string') return null;
  const parts = ticket.split('.');
  if (parts.length !== 2) return null;
  const [base64Data, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(base64Data).digest('base64url');
  if (signature !== expectedSignature) return null;
  try {
    const raw = Buffer.from(base64Data, 'base64url').toString('utf-8');
    const data = JSON.parse(raw);
    if (!data.expiresAt || Date.now() > data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

// Clean up expired sessions periodically
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [id, sess] of sessionsMap.entries()) {
    if (now > sess.expiresAt) sessionsMap.delete(id);
  }
  for (const [ticket, val] of validTicketsMap.entries()) {
    if (now > val.expiresAt) validTicketsMap.delete(ticket);
  }
}, 60000);
if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

export function generate6DigitOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestVerification(name: string, email: string, phone: string): Promise<{
  sessionId: string;
  expiresInSeconds: number;
  devHint?: { emailOtp: string; phoneOtp: string };
}> {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Please provide your full name.');
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Please provide a valid email address.');
  }

  // Validate email
  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    throw new Error('Please provide a valid email address.');
  }

  if (!phone || typeof phone !== 'string') {
    throw new Error('Please provide a valid mobile phone number.');
  }

  // Validate phone (min 10 digits)
  const cleanPhone = phone.trim().replace(/[\s-]/g, '');
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    throw new Error('Please provide a valid 10 to 15 digit mobile phone number.');
  }

  const sessionId = crypto.randomUUID();
  const emailOtp = generate6DigitOtp();
  const phoneOtp = generate6DigitOtp();
  const now = Date.now();
  const expiresAt = now + 10 * 60 * 1000; // 10 minutes

  sessionsMap.set(sessionId, {
    sessionId,
    name: name.trim(),
    email: cleanEmail,
    phone: cleanPhone,
    emailOtp,
    phoneOtp,
    createdAt: now,
    expiresAt,
    emailVerified: false,
    phoneVerified: false,
  });

  // If RESEND_API_KEY is configured, dispatch real email OTP to visitor's Gmail
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Abhishek Verma Portfolio <onboarding@resend.dev>',
          to: [cleanEmail],
          subject: `[Verification Code] Your OTP is ${emailOtp}`,
          text: `Hello ${name},\n\nYour 6-digit verification code to leave a review on Abhishek Kumar Verma's portfolio is: ${emailOtp}\n\nThis code expires in 10 minutes.\n\nRegards,\nAbhishek Kumar Verma Portfolio`
        })
      });
    } catch (e) {
      console.error('Failed to send email OTP via Resend:', e);
    }
  }

  // Log clearly in server console for local testing and transparency
  console.log('==============================================');
  console.log('🔐 VERIFICATION OTP GENERATED');
  console.log(`User: ${name}`);
  console.log(`Gmail/Email: ${cleanEmail} -> OTP: [ ${emailOtp} ]`);
  console.log(`Phone: ${cleanPhone} -> OTP: [ ${phoneOtp} ]`);
  console.log(`Session ID: ${sessionId}`);
  console.log('==============================================');

  return {
    sessionId,
    expiresInSeconds: 600,
    devHint: {
      emailOtp,
      phoneOtp
    }
  };
}

export function verifyOtps(
  sessionId: string,
  providedEmailOtp: string,
  providedPhoneOtp: string
): { success: boolean; verificationTicket?: string; message?: string } {
  const session = sessionsMap.get(sessionId);
  if (!session) {
    return { success: false, message: 'Verification session expired or invalid. Please request a new code.' };
  }

  if (Date.now() > session.expiresAt) {
    sessionsMap.delete(sessionId);
    return { success: false, message: 'Verification session has expired. Please request a new code.' };
  }

  const cleanEmailOtp = providedEmailOtp.trim();
  const cleanPhoneOtp = providedPhoneOtp.trim();

  const isEmailValid = session.emailOtp === cleanEmailOtp;
  const isPhoneValid = session.phoneOtp === cleanPhoneOtp;

  if (!isEmailValid && !isPhoneValid) {
    return { success: false, message: 'Both Email OTP and Phone OTP are incorrect.' };
  }
  if (!isEmailValid) {
    return { success: false, message: 'Invalid Email OTP. Please check the code sent to your Gmail.' };
  }
  if (!isPhoneValid) {
    return { success: false, message: 'Invalid Phone OTP. Please check the mobile verification code.' };
  }

  // Both strictly verified!
  session.emailVerified = true;
  session.phoneVerified = true;

  // Issue single-use signed verification ticket valid for 15 minutes
  const ticketData = {
    email: session.email,
    phone: session.phone,
    name: session.name,
    expiresAt: Date.now() + 15 * 60 * 1000
  };
  const ticket = createSignedTicket(ticketData);
  validTicketsMap.set(ticket, ticketData);

  // Consume session
  sessionsMap.delete(sessionId);

  return {
    success: true,
    verificationTicket: ticket
  };
}
