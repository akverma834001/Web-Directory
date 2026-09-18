import type { Endorsement } from '../types';

export interface RequestOtpResponse {
  success: boolean;
  sessionId?: string;
  expiresInSeconds?: number;
  message?: string;
  devHint?: {
    emailOtp: string;
    phoneOtp: string;
  };
}

export interface ConfirmOtpResponse {
  success: boolean;
  verificationTicket?: string;
  message?: string;
}

export async function fetchEndorsements(): Promise<Endorsement[]> {
  try {
    const res = await fetch('/api/endorsements');
    const data = await res.json();
    return data.endorsements || [];
  } catch (err) {
    console.error('Failed to fetch endorsements:', err);
    return [];
  }
}

export async function sendVerificationOtp(
  name: string,
  email: string,
  phone: string
): Promise<RequestOtpResponse> {
  const res = await fetch('/api/verify/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone })
  });
  return res.json();
}

export async function confirmVerificationOtp(
  sessionId: string,
  emailOtp: string,
  phoneOtp: string
): Promise<ConfirmOtpResponse> {
  const res = await fetch('/api/verify/confirm-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, emailOtp, phoneOtp })
  });
  return res.json();
}

export async function submitVerifiedEndorsement(
  ticket: string,
  data: {
    role: string;
    organization: string;
    relationship: string;
    comment: string;
    rating: number;
  }
): Promise<{ success: boolean; endorsement?: Endorsement; message?: string }> {
  const res = await fetch('/api/endorsements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticket, ...data })
  });
  return res.json();
}
