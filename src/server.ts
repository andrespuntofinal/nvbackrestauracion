import app from './app';
import { config } from './config';
import { connectMongo } from './infrastructure/db/mongoose';
import { initFirebaseAdmin } from './infrastructure/firebase/firebaseAdmin';

const start = async () => {
  await connectMongo();
  initFirebaseAdmin();

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});