import {Request, Response} from 'express';
import { Stagiaire } from '../models/Stagiaire.model';


//function pour la création d'un stagiaire
export const createStagiaires = async (req: Request, res: Response) => {
    try {
        const newStagiaire = new Stagiaire (req.body);
        const savedStagiaire = await newStagiaire.save();
        res.status(201).json(savedStagiaire);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la création.", error});
    }
};


// function pour la récupération
export const getStagiaires = async (req: Request, res: Response) => {
    try {
        const stagiaires = await Stagiaire.find();
        res.json(stagiaires);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération des stagiaires.", error});
    }
};

