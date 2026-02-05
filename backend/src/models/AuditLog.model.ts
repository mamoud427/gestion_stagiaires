import { Schema, model, Document } from "mongoose";

export interface IAuditLog extends Document {
    actorId: string;
    actorRole: string;
    action: string;
    entity: string;
    entityId?: string;
    description: string;
    ipAddress?: string;
    createAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog> ({
    actorId: { type: String, required: true },
    actorRole: { type: String, required: true },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: String },
    description: { type: String, required: true },
    ipAddress: { type: String },
}, {
    timestamps: {createdAt: true, updatedAt: false}
});

export const AuditLogModel = model<IAuditLog>("AuditLog", AuditLogSchema);

