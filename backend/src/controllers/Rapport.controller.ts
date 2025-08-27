// controllers/rapportController.ts
import { Request, Response } from "express";
import { RapportService } from "../services/Rapport.service";


export class RapportController {
static async uploadRapport(req: Request, res: Response): Promise<void> {
    try {
      const { stagiaireId } = req.params; // ⚡ on prend dans params (routeur)
      const file = req.file; // Multer gère `req.file`

      if (!stagiaireId || !file) {
        res.status(400).json({ error: "stagiaireId et fichier requis" });
        return;
      }

      const rapportService = new RapportService();
      const fileId = await rapportService.uploadRapport(stagiaireId, file.originalname, file.buffer);

      res.status(201).json({ message: "Rapport uploadé avec succès", fileId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'upload du rapport" });
    }
  };

  static async getRapports(req: Request, res: Response) {
    try {
      const rapportService = new RapportService();
      const rapports = await rapportService.getAllRapports();
      res.status(200).json(rapports);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des rapports" });
    }
  }

  static async downloadRapport(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const rapportService = new RapportService();
      await rapportService.downloadRapport(id, res);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors du téléchargement" });
    }
  }
}

