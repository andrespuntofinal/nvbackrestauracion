import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "");

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export default admin;
