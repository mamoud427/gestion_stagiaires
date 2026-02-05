import express from 'express';
import { StagiaireController } from '../controllers/Stagiaire.controller';

import { audit } from '../Middleware/audit.middleware';
import { authMiddleware } from '../Middleware/auth.middleware';

const router = express.Router();

const controller = StagiaireController;

// Routes pour les stagiaires

router.post('/create', 
    authMiddleware(['Admin', 'SuperAdmin']),
    audit('CREATE', 'STAGIAIRE'),
    controller.createStagiaire
);
router.get('/', 
    authMiddleware(['Admin', 'SuperAdmin']),
    controller.getAll
);
router.get('/:id', 
    authMiddleware(['Admin', 'SuperAdmin']),    
    controller.getById
);
router.put('/:id', 
    authMiddleware(['Admin', 'SuperAdmin']),
    audit('UPDATE', 'STAGIAIRE'),
    controller.update
);
router.delete('/:id', 
    authMiddleware(['SuperAdmin']),
    audit('DELETE', 'STAGIAIRE'),
    controller.delete
);

export default router;