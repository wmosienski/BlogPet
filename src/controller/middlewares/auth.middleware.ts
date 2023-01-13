import { IMiddleware } from "@Controller/interfaces/middleware.interface";
import { IUserService } from "@Service/interfaces";
import { Unauthorized } from "@Errors/Unauthorized";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware implements IMiddleware {
    private readonly _userService: IUserService

    constructor(userService: IUserService) {
        this._userService = userService;
    }

    public async execute(req: Request, res: Response, next: NextFunction) {
        if (!req.header('token')) {
            next(new Unauthorized('no header token provided'));
        } else {
            const token = req.header('token') || '';
            try {
                const userId = await this._userService.verifyToken(token);
                req.body.userId = userId;
            } catch (err) {
                next(err);
            }
            next();
        }
    }
}
