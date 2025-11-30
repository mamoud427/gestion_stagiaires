import {Request, Response} from "express";
import { EncadrantService } from "../services/Encadrant.service";

const encadrantService = new EncadrantService();

export class EncadrantController {

    // Création d'un encadrant
    async createEncadrant(req: Request, res: Response) {
        try {
            const encadrant = await encadrantService.createEncadrant(req.body);
            res.status(201).json(encadrant);
        } catch (error: any) {
            res.status(400).json({ message: "Erreur lors de la création de l'encadrant.", error });
        }
    }

    // login d'un encadreur
    async login(req: Request, res: Response) {
        try{
            const { email, password } = req.body;
            const result = await encadrantService.login(email, password);
            // console.log("Login request body:", req.body);
            res.status(200).json(result);
        } catch (error: any) {
            // console.log("Login request body:", req.body);

            res.status(400).json({ message: "Erreur lors de la connexion...", error: error.message });
        }
    }

    // Récupérer tous les encadreurs
    async getAllEncadrants(req: Request, res: Response) {
        try {
            const encadrants = await encadrantService.getAllEncadrants();
            res.status(200).json(encadrants);
        } catch (error: any) {
            res.status(500).json({ message: "Erreur lors de la récupération des encadreurs.", error });
        }
    }

    // modification d'un encadreur
    async updateEncadrant(req: Request, res: Response) {
        try {
            const encadrant = await encadrantService.updateEncadrant(req.params.id, req.body);
            if (!encadrant) {
                return res.status(404).json({ message: "Encadreur non trouvé." });
            } else {
                res.status(200).json({ message: "Encadreur supprimé avec succès." });
            }
        } catch (error: any) {
            res.status(400).json({ message: "Erreur lors de la mise à jour des données de l'encadreur.", error });
        }
    }

    // supprimer un encadreur
    async deleteEncadreur(req: Request, res: Response) {
        try {
            const encadrant = await encadrantService.deleteEncadrant(req.params.id);
            if (!encadrant) {
            return res.status(404).json({ message: "Encadreur non trouvé." });
            } else {
                res.status(200).json({ message: "Encadreur supprimé avec succès." });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'encadreur.", error });
        }
    }

    //  création d'un super Admin
    async createSuperAdmin(req: Request, res: Response) {
        try {
            const superAdmin = await encadrantService.createSuperAdmin(req.body);
            res.status(201).json(superAdmin);
        } catch (error: any) {
            res.status(400).json({ message: "Erreur lors de la création du super admin.", error: error.message });
        }
    }

}