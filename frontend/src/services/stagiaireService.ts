import api from "./api";

export interface Stagiaire {
    _id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    theme: string;
    dateDebut: string;
    dateFin: string;
    encadrant: string;
}

export const stagiaireService = {

    // créeation
    create: async(stagiaire: Stagiaire) => {
        const response = await api.post("/stagiaires/create", stagiaire);
        return response.data;
    },

    // récupération de tous les stagiaires
    getAll: async() => {
        const response = await api.get("/stagiaires");
        return response.data;
    },

    // récupération en fonction de l'ID
    getById: async(id: string) => {
        const response = await api.get(`/stagiaires/${id}`);
        return response.data;
    },

    // Modifier un stagiaire
    update: async(id:string, stagiaire: Partial<Stagiaire>) => {
        const response = await api.put(`/stagiaires/${id}`, stagiaire);
        return response.data;
    },

    // Supprimer un stagiaire
    delete: async(id:string) => {
        const response = await api.delete(`/stagiaires/${id}`);
        return response.data;
    }
}