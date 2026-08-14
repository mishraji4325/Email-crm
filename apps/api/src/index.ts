import express from 'express';
import cors from 'cors';
import http from 'http';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import importRoutes from './routes/import.routes';
import noteRoutes from './routes/note.routes';
import emailRoutes from './routes/email.route';
import generateRoutes from './routes/generate.route';
import sendRoutes from './routes/send.route';
import trackingRoutes from './routes/tracking.route';
import analyticsRoutes from './routes/analytics.route';
import campaignRoutes from './routes/campaign.route';
import webhookRoutes from './routes/webhook.route';
import sequenceRoutes from './routes/sequence.route';
import dasboardRoutes from './routes/dashboard.route';
import workspaceRoutes from './routes/workspace.route';
import notificationRoutes from './routes/notification.route';
import dotenv from 'dotenv';
import { AuthRequest, authMiddleware } from './middleware/auth.middleware';
import { initializeSocket } from './lib/socket';

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
server.listen(5000);