import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

/**
 * Middleware que valida que el usuario autenticado tenga el rol "admin".
 * Requiere que verifyFirebaseToken haya agregado req.user con el uid del usuario.
 */
export const checkAdminRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;

    if (!user || !user.uid) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // 🔎 Obtenemos los claims personalizados de Firebase
    const userRecord = await admin.auth().getUser(user.uid);

    const customClaims = userRecord.customClaims || {};

    if (customClaims.role === 'admin') {
      return next(); // ✅ tiene permisos
    } else {
      return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }
  } catch (error) {
    console.error('Error al verificar el rol de administrador:', error);
    return res.status(500).json({ message: 'Error interno de servidor' });
  }
};
