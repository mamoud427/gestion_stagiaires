// routes/rapportRoutes.ts
import { Router } from "express";
import { RapportController } from "../controllers/Rapport.controller";
import { upload } from "../Middleware/upload";

const router = Router();
// const rapport = new RapportController();

// Upload rapport pour un stagiaire
router.post("/:stagiaireId/upload", upload.single("file"), RapportController.uploadRapport);

// Récupérer la liste des rapports
router.get("/", RapportController.getRapports);

// Télécharger un rapport
router.get("/:id/download", RapportController.downloadRapport);

export default router;
