import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processContactSubmission } from './contactHandler.ts';
import { requestVerification, verifyOtps } from './verificationService.ts';
import { getEndorsements, addEndorsement } from './endorsementsService.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const result = await processContactSubmission(req.body, ip);
  res.status(result.status).json(result.body);
});

// Verification endpoints
app.post('/api/verify/send-otp', async (req, res) => {
  try {
    const result = await requestVerification(req.body.name, req.body.email || req.body.gmail, req.body.phone);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message || 'Verification request failed.' });
  }
});

app.post('/api/verify/confirm-otp', (req, res) => {
  const result = verifyOtps(req.body.sessionId, req.body.emailOtp, req.body.phoneOtp);
  res.status(result.success ? 200 : 400).json(result);
});

// Endorsement endpoints
app.get('/api/endorsements', (_req, res) => {
  const list = getEndorsements();
  res.json({ success: true, endorsements: list });
});

app.post('/api/endorsements', (req, res) => {
  const result = addEndorsement(req.body.ticket, {
    role: req.body.role,
    organization: req.body.organization,
    relationship: req.body.relationship,
    comment: req.body.comment,
    rating: req.body.rating
  });
  res.status(result.success ? 201 : 403).json(result);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Portfolio API server running on port ${PORT}`);
  });
}

export default app;
