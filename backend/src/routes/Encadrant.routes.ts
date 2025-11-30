import { Router } from "express";
import { EncadrantController } from "../controllers/Encadrant.controller";
import { authMiddleware } from "../Middleware/auth.middleware";

const router = Router();
const controller = new EncadrantController;


// route publique pour la création initiale du super admin
router.post("/superadmin", controller.createSuperAdmin.bind(controller));

// router.post("/register", authMiddleware(["SuperAdmin"]), controller.createEncadrant.bind(controller));
router.post("/register", controller.createEncadrant.bind(controller));
router.post("/login", controller.login.bind(controller));
router.get("/", authMiddleware(["SuperAdmin", "Admin"]),controller.getAllEncadrants.bind(controller));

router.put("/:id", authMiddleware(["SuperAdmin", "Admin"]), controller.updateEncadrant.bind(controller));
router.delete("/:id", authMiddleware(["SuperAdmin"]), controller.deleteEncadreur.bind(controller));

export default router;