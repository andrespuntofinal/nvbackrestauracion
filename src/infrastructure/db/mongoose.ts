import mongoose from 'mongoose';
import { config } from '../../config';

export const connectMongo = async () => {
  await mongoose.connect(config.MONGODB_CNN);
  console.log('MongoDB connected');
};
