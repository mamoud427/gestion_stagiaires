import api from "./api";

export interface Encadreur {
    // _id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone: string;
    poste: string;
    role:string;
}

export const encadreurService = {

    // Créer un encadreur
    create: async(encadrant: Encadreur) => {
        const response = await api.post("/encadrant/register", encadrant);
        return response.data;
    },

    // Récupérer tous les encadreurs
    getAll: async() => {
        const response = await api.get("/encadrant");
        return response.data;
    },

    // Récupérer un encadreur par ID
    getById: async(id: string) => {
        const response = await api.get(`/encadrant/${id}`);
        return response.data;
    },

    // Modifier un encadreur
    update: async(id:string, encadrant:Encadreur) => {
        const response = await api.put(`/encadrant/${id}`, encadrant);
        return response.data;
    },

    // Supprimer un encadreur
    delete: async(id:string) => {
        const response = await api.delete(`/encadrant/${id}`);
        return response.data;
    },
}