import { IMiddleware } from "@Controller/interfaces/middleware.interface";
import { Unauthorized } from "@Errors/Unauthorized";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@Utils/crypt";
import { IWSMiddleware } from "@Controller/interfaces/wsMiddleware.interface";
import * as ws from 'ws';
import { IChatService } from "@Service/interfaces/chat.interface";

export class AuthWSMiddleware implements IWSMiddleware {

    private readonly _chatService: IChatService;

    constructor(chatService: IChatService) {
        this._chatService = chatService;
    }

    public async execute(ws: ws, req: Request, next: NextFunction) {
        const webSocketToken = req.query?.webSocketToken || '';
        if (!webSocketToken) {
            next(new Unauthorized('no body token field provided'));
        } else {
            try {
                verifyToken('' + webSocketToken);
            } catch (err) {
                next(err);
            }
            next();
        }
    }
}
