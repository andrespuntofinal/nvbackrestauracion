import express from 'express';
import cors from 'cors';
import memberRoutes from './interfaces/http/routes/memberRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/members', memberRoutes);

export default app;
