import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: Number(process.env.PORT) || 4000,
  MONGODB_CNN: process.env.MONGODB_CNN || 'mongodb://localhost:27017/restauracion',
  FIREBASE_SERVICE_ACCOUNT_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  RATE_LIMIT_WINDOW_MS: Number(process.env.API_RATE_LIMIT_WINDOW_MS) || 60000,
  RATE_LIMIT_MAX: Number(process.env.API_RATE_LIMIT_MAX) || 100
};
