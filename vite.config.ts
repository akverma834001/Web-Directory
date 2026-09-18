import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { processContactSubmission } from './server/contactHandler.ts';
import { requestVerification, verifyOtps } from './server/verificationService.ts';
import { getEndorsements, addEndorsement } from './server/endorsementsService.ts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-api-router',
      configureServer(server) {
        // Helper to parse JSON body
        const parseJson = (req: any): Promise<any> => {
          return new Promise((resolve, reject) => {
            let bodyStr = '';
            req.on('data', (chunk: Buffer) => {
              bodyStr += chunk.toString();
            });
            req.on('end', () => {
              try {
                resolve(bodyStr ? JSON.parse(bodyStr) : {});
              } catch (e) {
                reject(e);
              }
            });
          });
        };

        // 1. Contact submission endpoint
        server.middlewares.use('/api/contact', async (req, res) => {
          if (req.method === 'POST') {
            try {
              const body = await parseJson(req);
              const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
              const result = await processContactSubmission(body, String(ip));
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.body));
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Invalid JSON format.' }));
            }
          } else {
            res.statusCode = 405;
            res.end('Method Not Allowed');
          }
        });

        // 2. Verification: Send OTP for Gmail & Phone
        server.middlewares.use('/api/verify/send-otp', async (req, res) => {
          if (req.method === 'POST') {
            try {
              const body = await parseJson(req);
              const result = await requestVerification(body.name, body.email || body.gmail, body.phone);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, ...result }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err.message || 'Verification request failed.' }));
            }
          } else {
            res.statusCode = 405;
            res.end('Method Not Allowed');
          }
        });

        // 3. Verification: Confirm OTPs
        server.middlewares.use('/api/verify/confirm-otp', async (req, res) => {
          if (req.method === 'POST') {
            try {
              const body = await parseJson(req);
              const result = verifyOtps(body.sessionId, body.emailOtp, body.phoneOtp);
              res.statusCode = result.success ? 200 : 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err.message || 'OTP verification failed.' }));
            }
          } else {
            res.statusCode = 405;
            res.end('Method Not Allowed');
          }
        });

        // 4. Endorsements: GET and POST
        server.middlewares.use('/api/endorsements', async (req, res) => {
          if (req.method === 'GET') {
            const list = getEndorsements();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, endorsements: list }));
          } else if (req.method === 'POST') {
            try {
              const body = await parseJson(req);
              const result = addEndorsement(body.ticket, {
                role: body.role,
                organization: body.organization,
                relationship: body.relationship,
                comment: body.comment,
                rating: body.rating
              });
              res.statusCode = result.success ? 201 : 403;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err.message || 'Failed to submit review.' }));
            }
          } else {
            res.statusCode = 405;
            res.end('Method Not Allowed');
          }
        });
      }
    }
  ],
});
