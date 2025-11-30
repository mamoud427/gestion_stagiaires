import express from 'express';
import { StagiaireController } from '../controllers/Stagiaire.controller';

const router = express.Router();

const controller = StagiaireController;

// Routes pour les stagiaires

router.post('/create', controller.createStagiaire);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;