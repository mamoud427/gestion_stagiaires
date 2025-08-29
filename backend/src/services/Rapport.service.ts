// services/rapportService.ts
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { StagiaireModel } from "../models/Stagiaire.model";
import { Readable } from "stream";

export class RapportService {
  private bucket: GridFSBucket;

  constructor() {
    // Vérifie que la connexion mongoose est prête
    if (!mongoose.connection.db) {
      throw new Error("La connexion MongoDB n'est pas encore initialisée !");
    }

    this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "rapports",
    });
  }

 async uploadRapport(stagiaireId: string, filename: string, buffer: Buffer) {
    const readableStream = Readable.from(buffer);
    const uploadStream = this.bucket.openUploadStream(filename);
    readableStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
      uploadStream.on("finish", async () => {
        const fileId = uploadStream.id;

        // 🔗 Lier au stagiaire
        await StagiaireModel.findByIdAndUpdate(
          stagiaireId,
          { $set: { rapportId: fileId } }, // il faut que ton modèle Stagiaire ait `rapportId`
          { new: true }
        );

        resolve(fileId);
      });
      uploadStream.on("error", reject);
    });
  }

   async getAllRapports() {
    try {
        const db = mongoose.connection.db;
        const files = await db!.collection("rapports.files").find().toArray();
        
        // Associer les fichiers aux stagiaires
        const rapports = await Promise.all(
        files.map(async (file) => {
            const stagiaire = await StagiaireModel.findOne({ rapportId: file._id });
            return {
                _id: file._id,
                filename: file.filename,
                uploadDate: file.uploadDate,
                stagiaire: stagiaire
                    ? { nom: stagiaire.nom, prenom: stagiaire.prenom }
                    : { nom: "Inconnu", prenom: "" },
            };
        })

        
        );
        return rapports;

    } catch (err) {
        console.error(err);
    }
  }

  async downloadRapport(fileId: string, res: any) {
    try {
      const _id = new mongoose.Types.ObjectId(fileId);
      const downloadStream = this.bucket.openDownloadStream(_id);

      downloadStream.on("error", (err) => {
        res.status(404).json({ error: "Rapport introuvable" });
      });

      downloadStream.pipe(res);
    } catch (error) {
      res.status(400).json({ error: "ID invalide" });
    }
  }
}
