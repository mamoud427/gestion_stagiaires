import {Request, Response} from "express";
import { AttestationService } from "../services/Pdf.service";

export class AttestationController {
  private service: AttestationService;

  constructor() {
    this.service = new AttestationService();
  }

  genererAttestation = async (req: Request, res: Response): Promise<void> => {
    try {
      const { stagiaireId } = req.params;
      await this.service.genererAttestation(stagiaireId, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}