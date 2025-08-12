import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

// definition du type de notre playload JWT
interface UserJwtPlayload extends JwtPayload {
    id: string;
    role: string;
} 


// middleware pour vérifier le token JWT et les rôles
// roles: tableau de rôles autorisés, par défaut ['SuperAdmin', 'Admin']
export const authMiddleware = (roles: string[] = ['SuperAdmin', 'Admin']) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // vevrification de l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token manquant ou invalide.' });
        }
        const token = authHeader.split(' ')[1];

        try {
            //  vérification et typage du token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserJwtPlayload;

            // vérification de la présence et de l'autorisation du role
             if (!decoded || !decoded.role || !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Accès refusé. Rôle non autorisé.' });
            }

            // ajout des informations de l'utilisateur dans la requête
            (req as any).user = {
                id: decoded.id,
                role: decoded.role
            };
            next();
        } catch (Err) {
            return res.status(403).json({ message: 'Token invalide.' });
        }        
    }
};
    