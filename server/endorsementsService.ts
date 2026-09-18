import fs from 'fs';
import path from 'path';
import os from 'os';
import { validTicketsMap, verifySignedTicket } from './verificationService.ts';

export interface Endorsement {
  id: string;
  name: string;
  role: string;
  organization: string;
  relationship: string;
  comment: string;
  rating: number;
  verifiedEmail: string;
  verifiedPhone: string;
  verifiedDate: string;
  avatarInitial: string;
}

const isVercel = process.env.VERCEL === '1' || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const dataDir = isVercel ? os.tmpdir() : path.join(process.cwd(), 'server', 'data');
const dataFile = path.join(dataDir, 'endorsements.json');

const initialEndorsements: Endorsement[] = [];
let inMemoryEndorsements: Endorsement[] = [];

function ensureStorage(): void {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify(initialEndorsements, null, 2), 'utf-8');
    }
  } catch {
    // Graceful fallback for read-only serverless filesystems
  }
}

export function getEndorsements(): Endorsement[] {
  ensureStorage();
  try {
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf-8');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        // Merge with memory
        const ids = new Set(list.map(e => e.id));
        for (const m of inMemoryEndorsements) {
          if (!ids.has(m.id)) list.unshift(m);
        }
        return list;
      }
    }
  } catch {
    // Fall back to in-memory
  }
  return inMemoryEndorsements;
}

export function maskEmail(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return 'v***@gmail.com';
  const name = parts[0];
  const domain = parts[1];
  if (name.length <= 2) return `${name[0]}***@${domain}`;
  return `${name[0]}***${name[name.length - 1]}@${domain}`;
}

export function maskPhone(phone: string): string {
  if (phone.length < 8) return '+91 ****';
  const last4 = phone.slice(-4);
  const prefix = phone.slice(0, 3);
  return `${prefix} ****${last4}`;
}

export function addEndorsement(
  ticket: string,
  data: {
    role: string;
    organization: string;
    relationship: string;
    comment: string;
    rating: number;
  }
): { success: boolean; endorsement?: Endorsement; message?: string } {
  // STRICT VERIFICATION CHECK: Check in-memory map or verify cryptographic HMAC signature
  let ticketInfo = validTicketsMap.get(ticket);
  if (!ticketInfo && typeof verifySignedTicket === 'function') {
    ticketInfo = verifySignedTicket(ticket) || undefined;
  }

  if (!ticketInfo) {
    return {
      success: false,
      message: 'Unauthorized: You must verify both your Gmail address and mobile phone number with OTP before publishing a review.'
    };
  }

  if (Date.now() > ticketInfo.expiresAt) {
    validTicketsMap.delete(ticket);
    return {
      success: false,
      message: 'Verification token expired. Please re-verify your phone and email.'
    };
  }

  if (!data.comment || data.comment.trim().length < 15) {
    return { success: false, message: 'Please write a review of at least 15 characters.' };
  }

  const endorsements = getEndorsements();

  const initials = ticketInfo.name
    .split(' ')
    .filter(Boolean)
    .map(p => p[0].toUpperCase())
    .slice(0, 2)
    .join('') || 'V';

  const newEntry: Endorsement = {
    id: `end-${Date.now()}`,
    name: ticketInfo.name,
    role: data.role?.trim() || 'Software Collaborator',
    organization: data.organization?.trim() || 'Engineering Network',
    relationship: data.relationship?.trim() || 'Peer Reviewer',
    comment: data.comment.trim(),
    rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
    verifiedEmail: maskEmail(ticketInfo.email),
    verifiedPhone: maskPhone(ticketInfo.phone),
    verifiedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    avatarInitial: initials
  };

  endorsements.unshift(newEntry);
  inMemoryEndorsements.unshift(newEntry);

  try {
    ensureStorage();
    fs.writeFileSync(dataFile, JSON.stringify(endorsements, null, 2), 'utf-8');
  } catch {
    // Handled by inMemoryEndorsements
  }

  // Single-use ticket consumed
  validTicketsMap.delete(ticket);

  return {
    success: true,
    endorsement: newEntry
  };
}
