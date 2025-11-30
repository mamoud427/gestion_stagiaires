import { Router } from "express";
import { EncadrantModel } from "../models/Encadrant.model";
import { StagiaireModel } from "../models/Stagiaire.model";

const router = Router();

router.get('/stats', async (req, res) => {
    try {
        const NbresStagiaires = await StagiaireModel.countDocuments();
        const NbresEncadreurs = await EncadrantModel.countDocuments();
        const StageenCours = await StagiaireModel.countDocuments({statut: 'en_cours'});
        const StageTermine = await StagiaireModel.countDocuments({statut: 'termine'});

        res.json({
            nbreStagiaire : NbresStagiaires,
            nbreEncadrant : NbresEncadreurs,
            stageEnCours : StageenCours,
            stageTermine : StageTermine
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Erreur lors de la recuperation des statistiques."});
    }
});

export default router;