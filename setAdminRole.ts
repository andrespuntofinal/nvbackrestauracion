import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Inicializa Firebase Admin
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH!);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const setAdminRole = async (uid: string) => {
  await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
  console.log(`Rol admin asignado al usuario con UID: ${uid}`);
};

const uid = 'EAf2hzIr2yOvxK3wyd8XClQGld63'; // 👈 reemplaza con el UID del usuario de Firebase
setAdminRole(uid)
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
