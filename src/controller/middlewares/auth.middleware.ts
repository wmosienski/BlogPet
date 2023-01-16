import { IMiddleware } from "@Controller/interfaces/middleware.interface";
import { Unauthorized } from "@Errors/Unauthorized";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@Utils/crypt";

export class AuthMiddleware implements IMiddleware {

    public async execute(req: Request, res: Response, next: NextFunction) {
        if (!req.header('authorization')) {
            next(new Unauthorized('no header token provided'));
        } else {
            const token = req.header('authorization') || '';
            try {
                verifyToken(token);
            } catch (err) {
                next(err);
            }
            next();
        }
    }
}
