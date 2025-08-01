import express from 'express';
import { createStagiaires, getStagiaires } from '../controllers/stagiaire.controller';

const router = express.Router();

router.get('/', getStagiaires);
router.post('/create', createStagiaires);
// router.put('/:id', );
// router.delete('/:id', );

export default router;