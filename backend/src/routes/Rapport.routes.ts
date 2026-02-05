// routes/rapportRoutes.ts
import { Router } from "express";
import { RapportController } from "../controllers/Rapport.controller";
import { upload } from "../Middleware/upload";
import { authMiddleware } from "../Middleware/auth.middleware";
import { audit } from "../Middleware/audit.middleware";

const router = Router();

// Upload rapport pour un stagiaire
router.post("/:stagiaireId/upload", 
    authMiddleware([]),
    upload.single("file"), RapportController.uploadRapport
);

// Récupérer la liste des rapports
router.get("/", RapportController.getRapports);

// Télécharger un rapport
router.get("/:id/download", RapportController.downloadRapport);

export default router;
