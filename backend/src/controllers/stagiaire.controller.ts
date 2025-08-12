import {Request, Response} from 'express';
import { StagiaireService } from '../services/Stagiaire.sevice';

const service = new StagiaireService();


export const StagiaireController = {

    // Création d'un stagiaire
    async createStagiaire(req: Request, res: Response) {
        try{
            const stagiaire = await service.createStagiaire(req.body);
            res.status(201).json(stagiaire);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du stagiaire.", error});
        }
    },

    // Récupération de tous les stagiaires
    async getAll(req: Request, res: Response) {
        try{
            const stagiaires = await service.findAll();
            res.status(200).json(stagiaires);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des stagiaires.", error });
        }
    },

    // Récupération d'un stagiaire par ID
    async getById(req: Request, res: Response) {
        try{
            const stagiaire = await service.findById(req.params.id);
            res.status(200).json(stagiaire);
        } catch (e) {
            res.status(500).json({ message: "Erreur lors de la récupération du stagiaire.", error: e });
        }
    },

    // Mise à jour d'un stagiaire
    async update(req: Request, res: Response) {
        try {
            const stagiaire = await service.updateStagiaire(req.params.id, req.body);
            if (!stagiaire) {
                return res.status(404).json({ message: "Stagiaire non trouvé." });
            } else {
                res.status(200).json(stagiaire);
            }
        } catch (e) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du stagiaire.", error: e });
        }
    },

    // Suppression d'un stagiaire
    async delete(req: Request, res: Response) {
        try {
            const stagiaire = await service.deleteStagiaire(req.params.id);
            if (!stagiaire) {
                return res.status(404).json({ message: "Stagiaire non trouvé." });
            } else {
                res.status(200).json({ message: "Stagiaire supprimé avec succès." });
            }
        } catch (e) {
            res.status(500).json({ message: "Erreur lors de la suppression du stagiaire.", error: e });
        }
    }

}







