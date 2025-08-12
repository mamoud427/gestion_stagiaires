import mongoose, {Document, Schema} from "mongoose";

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
    createAt?: Date;
    updatedAt?: Date;
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
        encadrant: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export const StagiaireModel = mongoose.model("Stagiaire", StagiaireSchema);