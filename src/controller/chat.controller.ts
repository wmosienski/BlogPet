import { IUserService } from "@Service/interfaces/user.interface";
import { DI_TYPES } from "DI_TYPES";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { CatchError } from "./helpers/catch.error.decorator";
import 'reflect-metadata';
import { BaseController } from "./common/base.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { IChatService } from "@Service/interfaces/chat.interface";
import { HTTPCodes } from "./helpers/http-codes";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class ChatController extends BaseController {
    private readonly _chatService: IChatService;

    constructor(
        @inject(DI_TYPES.ChatService) chatService: IChatService,
    ) {
        super();
        this._chatService = chatService;
        this.bindRouters([
            {
                path: '/webSocketToken',
                method: 'get',
                middlewares: [new AuthMiddleware()],
                func: this.getWebSocketToken,
            }
        ])
    }

    public async getWebSocketToken(req: Request<{}, {}, {}>, res: Response): Promise<void> {
        const webSocketToken = await this._chatService.generateWebSocketToken();

        res.status(HTTPCodes.success.ok).send(webSocketToken);
    }
}
