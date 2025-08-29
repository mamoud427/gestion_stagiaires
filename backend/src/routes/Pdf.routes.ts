import { Router} from "express";
import { AttestationController } from "../controllers/Pdf.controller";

const router = Router();
const controller = new AttestationController();

router.get("/:stagiaireId/pdf", controller.genererAttestation);

export default router;