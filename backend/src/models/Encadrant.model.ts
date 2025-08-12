import mongoose from "mongoose";

const EncadreurSchema = new mongoose.Schema(
    {
        nom: {type: String, required: true},
        prenom: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        telephone: {type: String, required: true},
        poste: {type: String, required: true},
        role: {type: Boolean, required: true}
    },
    {
        timestamps: true
    }
);

export const Encadreur = mongoose.model("Encadreur", EncadreurSchema);