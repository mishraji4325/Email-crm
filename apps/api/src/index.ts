import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import { AuthRequest, authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use('/auth', authRoutes);

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
