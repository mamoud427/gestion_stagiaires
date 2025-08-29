import PDFDocument from "pdfkit";
import { Response } from "express";
import mongoose from "mongoose";
import path from "path";
import moment from "moment";

export class AttestationService {
    // private bucket: GridFSBucket;
    // constructor() {
    //    // Vérifie que la connexion mongoose est prête
    //     if (!mongoose.connection.db) {
    //     throw new Error("La connexion MongoDB n'est pas encore initialisée !");
    //     }
    //   }

    async genererAttestation(stagiaireId: string, res: Response): Promise<void> {
     
        if (!mongoose.connection.db) {
        throw new Error("La connexion à la base de données n'est pas encore initialisée.");
        }

        const _id = new mongoose.Types.ObjectId(stagiaireId);
        const stagiaire = await mongoose.connection.db
        .collection("stagiaires")
        .findOne({ _id });

        if (!stagiaire) {
          throw new Error("❌ Stagiaire introuvable.");
        }

        const doc= new PDFDocument({ size: "A4", margin: 50});

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=Attestation_de_${stagiaire.nom}_${stagiaire.prenom}.pdf`);

        doc.pipe(res);

        // === Affichage de la page ===
        
        // En tete de la page
        const logoPath = path.join(__dirname, "../assets/entete phoenix group sarl.png");
        doc.image(logoPath, 10, 0, {width: 600});
        doc.moveDown(4); 

        // Header
        doc
          .fontSize(25)
          .font("Times-Bold")
          .text("ATTESTATION DE FIN DE STAGE", { align: "center", underline: true, });
        doc.moveDown();

        // Corps de la page
        doc.fontSize(12).text(`Nous soussignés, certifions que ${stagiaire.nom} ${stagiaire.prenom}, a effectué un stage au sein de notre entreprise.`);
        doc.moveDown();

        // Dates formatées
      const dateDebut = moment(stagiaire.dateDebut).format("DD/MM/YYYY");
      const dateFin = moment(stagiaire.dateFin).format("DD/MM/YYYY");

        doc.text(`Allant de: ${dateDebut} jusqu'à ${dateFin} durant laquelle l'intéressé(e) a fait preuve de sérieux et d'engagement.`);
        doc.moveDown();
        doc.text("Ce stage a permis au stagiaire d'acquérir des compétences pratiques et professionnelles.");
        doc.moveDown(2);

        // Footer
        doc.text("Fait à Yaoundé, le "+ new Date().toLocaleDateString(), {align: "left"});
        doc.text("Signature et Cachet", {align: "right"});

        doc.end();
    }
}