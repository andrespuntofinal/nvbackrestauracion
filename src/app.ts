import express from 'express';
import cors from 'cors';
import memberRoutes from './interfaces/http/routes/memberRoutes';
import transactionRoutes from './interfaces/http/routes/transactionRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
