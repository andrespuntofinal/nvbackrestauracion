import { admin } from '../infrastructure/firebase/firebaseAdmin';
import { Request, Response, NextFunction } from 'express';

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Guarda los datos del usuario en la request
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verificando token Firebase:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
