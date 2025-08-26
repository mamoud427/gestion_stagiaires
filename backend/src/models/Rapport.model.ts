import mongoose, {Document, Schema} from "mongoose";

export interface IRapport extends Document {
    stagiaireID: Types.ObjectId;
    nomFichier: string;
    typeFichier: string;
    data: Buffer;
    dateDepot: Date;
}

const RapportSchema = new Schema<IRapport> ({
    stagiaireID: {type: Schema.Types.ObjectId, ref: "Stagiaire", required: true},
    nomFichier: {type: String, required: true},
    typeFichier: {type: String, required: true},
    data: {type: Buffer, required: true},
    dateDepot: {type: Date, default: Date.now}
});

export const RapportModel = mongoose.model<IRapport>("Rapport", RapportSchema);