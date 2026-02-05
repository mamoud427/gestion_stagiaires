import { Request, Response, NextFunction } from "express";
import { AuditLogService } from "../services/AuditLog.service";

export const audit =
  (action: string, entity: string) =>
  (req: Request, res: Response, next: NextFunction) => {

    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
      if ((req as any).user && res.statusCode < 400) {
        AuditLogService.create({
          actorId: (req as any).user.id,
          actorRole: (req as any).user.role,
          action,
          entity,
          entityId: body?._id,
          description: `${action} sur ${entity}`,
          ipAddress: req.ip,
        });
      }

      return originalJson(body);
    };

    next();
  };
