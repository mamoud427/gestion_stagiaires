import { Router } from "express";
import { EncadrantController } from "../controllers/Encadrant.controller";
import { authMiddleware } from "../Middleware/auth.middleware";
import { audit } from "../Middleware/audit.middleware";

const router = Router();
const controller = new EncadrantController;


// route publique pour la création initiale du super admin
router.post("/superadmin", controller.createSuperAdmin.bind(controller));

router.post("/register", 
    authMiddleware(["SuperAdmin"]),
    audit('CREATE', 'ENCADREUR'), 
    controller.createEncadrant.bind(controller)
);
// router.post("/register", controller.createEncadrant.bind(controller));
router.post("/login", 
    audit('LOGIN', 'ENCADREUR'),
    controller.login.bind(controller)
);
router.get("/", 
    authMiddleware(["SuperAdmin", "Admin"]),
    controller.getAllEncadrants.bind(controller)
);

router.put("/:id", 
    authMiddleware(["SuperAdmin", "Admin"]), 
    audit('UPDATE', 'ENCADREUR'),
    controller.updateEncadrant.bind(controller)
);
router.delete("/:id", 
    authMiddleware(["SuperAdmin"]), 
    audit('DELETE', 'ENCADREUR'),
    controller.deleteEncadreur.bind(controller)
);

export default router;