import mongoose, {Document, model, Schema, Types} from "mongoose";

// interface Typescript d'un stagiaire
export interface IStagiaire extends  Document {
    nom: String,
    prenom: String,
    email: String,
    telephone: String,
    theme: String,
    dateDebut: Date,
    dateFin: Date,
    encadrant: String,
    rapportId?: mongoose.Types.ObjectId;
    statut: String,
    createAt?: Date,
    updatedAt?: Date,
}

// Schema Mongoose d'un stagiaire
const StagiaireSchema: Schema<IStagiaire> = new Schema(
    {
        nom: {type: String, required: true},
        prenom: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        telephone: {type: String, required: true},
        theme: {type: String, required: true},
        dateDebut: {type: Date, required: true},
        dateFin: {type: Date, required: true},
        encadrant: {type: String, required: true},
        statut: {type: String, enum: ["en_cours","termine"], default: "en_cours"},
        rapportId: { type: Schema.Types.ObjectId } // GridFS stocke l’ID du fichier
    },
    {
        timestamps: true
    }
);

export const StagiaireModel = mongoose.model("Stagiaire", StagiaireSchema);