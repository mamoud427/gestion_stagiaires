import mongoose from "mongoose";

const stagiaireSchema = new mongoose.Schema(
    {
        nom: {type: String, required: true},
        prenom: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        telephone: {type: String, required: true},
        theme: {type: String, required: true},
        dateDebut: {type: Date, required: true},
        dateFin: {type: Date, required: true},
        encadrant: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export const Stagiaire = mongoose.model("Stagiaire", stagiaireSchema);