import type { IncomingMessage, ServerResponse } from 'http';
import { getEndorsements, addEndorsement } from '../server/endorsementsService.ts';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'GET') {
    const list = getEndorsements();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, endorsements: list }));
    return;
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (!body) {
      const buffers: Buffer[] = [];
      for await (const chunk of req) {
        buffers.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      try {
        body = JSON.parse(Buffer.concat(buffers).toString());
      } catch {
        body = {};
      }
    }

    try {
      const result = addEndorsement(body?.ticket, {
        role: body?.role,
        organization: body?.organization,
        relationship: body?.relationship,
        comment: body?.comment,
        rating: body?.rating
      });
      res.statusCode = result.success ? 201 : 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } catch (err: any) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: err.message || 'Failed to submit review.' }));
    }
    return;
  }

  res.statusCode = 405;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
}
