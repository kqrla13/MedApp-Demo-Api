import { NextFunction, Response } from 'express';
import { createTResult } from '../mappers/tresult.mapper';

export const roleValidator = (allowedRoles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json(createTResult("", "User not authenticated"));
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json(createTResult("", "Forbidden: You do not have permission to perform this action"));
            }

            next();
        } catch (error) {
            return res.status(500).json(createTResult("", "Internal server error during authorization"));
        }
    };
};
