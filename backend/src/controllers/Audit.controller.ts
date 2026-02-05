import { Request, Response } from "express";
import { AuditLogService } from "../services/AuditLog.service";

export class AuditLogController {
    static async getAll(req: Request, res: Response) {
        try {
            const logs = await AuditLogService.findAll();
            res.json(logs); 
        } catch (error) {
            res.status(500).json({message: "Erreur lors de la recuperation du journal.", error});
        }
    }
}