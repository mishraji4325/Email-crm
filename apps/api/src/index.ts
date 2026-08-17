import express from 'express';
import cors from 'cors';
import http from 'http';
import authRoutes from './routes/auth.routes.js';
import leadRoutes from './routes/lead.routes.js';
import importRoutes from './routes/import.routes.js';
import noteRoutes from './routes/note.routes.js';
import emailRoutes from './routes/email.route.js';
import generateRoutes from './routes/generate.route.js';
import sendRoutes from './routes/send.route.js';
import trackingRoutes from './routes/tracking.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import campaignRoutes from './routes/campaign.route.js';
import webhookRoutes from './routes/webhook.route.js';
import sequenceRoutes from './routes/sequence.route.js';
import dasboardRoutes from './routes/dashboard.route.js';
import workspaceRoutes from './routes/workspace.route.js';
import notificationRoutes from './routes/notification.route.js';
import dotenv from 'dotenv';
import { AuthRequest, authMiddleware } from './middleware/auth.middleware.js';
import { initializeSocket } from './lib/socket.js';

dotenv.config();
// console.log(process.env.REDIS_URL);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/leads', leadRoutes)

app.use('/import', importRoutes);

app.use('/notes', noteRoutes)

app.use('/emails', emailRoutes);

app.use('/generate', generateRoutes);

app.use('/send', sendRoutes);

app.use('/track', trackingRoutes);

app.use('/analytics', analyticsRoutes);

app.use('/campaigns', campaignRoutes);

app.use('/webhooks', webhookRoutes);

app.use('/sequence', sequenceRoutes);

app.use('/dashboard', dasboardRoutes);

app.use('/workspace', workspaceRoutes);

app.use('/notifications', notificationRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get(
  "/profile",
  authMiddleware,
  (req: AuthRequest, res) => {
    res.json({
      message: "Protected route",
      userId: req.userId,
    });
  }
);

const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const server = http.createServer(app);
initializeSocket(server);
server.listen(port, () => {
  console.log(`API server running on port ${port}`);
});