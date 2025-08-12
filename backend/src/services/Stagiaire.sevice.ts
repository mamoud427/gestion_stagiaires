import { StagiaireModel, IStagiaire } from "../models/Stagiaire.model";

export class StagiaireService {

    // fonction pour créer un stagiaire
    async createStagiaire(data: IStagiaire): Promise<IStagiaire> {
        const stagiaire = new StagiaireModel(data);
        return await stagiaire.save();
    }

    // fonction pour récupérer tous les stagiaires
    async findAll(): Promise<IStagiaire[]> {
        return await StagiaireModel.find().sort({ createdAt: -1 });
    }

    // fonction pour trouver un stagiaire par ID
    async findById(id: string): Promise<IStagiaire | null> {
        return await StagiaireModel.findById(id);
    }

    // fonction pour mettre à jour un stagiaire
    async updateStagiaire(id: string, data: Partial<IStagiaire>): Promise<IStagiaire | null> {
        return await StagiaireModel.findByIdAndUpdate(id, data, { new: true});
    }

    // fonction pour supprimer un stagiaire
    async deleteStagiaire(id: string): Promise<IStagiaire | null> {
        return await StagiaireModel.findByIdAndDelete(id);
    }
}