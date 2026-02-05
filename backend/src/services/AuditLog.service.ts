import { AuditLogModel } from "../models/AuditLog.model";

interface CreateAuditLogDTO {
    actorId: string;
    actorRole: string;
    action: string;
    entity: string;
    entityId?: string;
    description: string;
    ipAddress?: string;
}

export class AuditLogService {
    static async create(data: CreateAuditLogDTO) {
        await AuditLogModel.create(data);
    }

    static async findAll(limit: number = 100) {
        await AuditLogModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit);
    }
}