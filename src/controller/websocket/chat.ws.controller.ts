import { UserRegisterDTO } from "@DTO/user/user-register.dto";
import { IUserService } from "@Service/interfaces/user.interface";
import { DI_TYPES } from "DI_TYPES";
import { NextFunction, Request } from "express";
import { injectable, inject } from "inversify";
import { CatchError } from "../helpers/catch.error.decorator";
import 'reflect-metadata';
import { BaseWSController } from "../common/base.ws.controller";
import * as ws from 'ws';
import { AuthWSMiddleware } from "../middlewares/auth.ws.middleware";
import { ChatService } from "@Service/chat/chat.service";
import { WebSocketUser } from "./websocket.chatuser";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class ChatWSController extends BaseWSController {
    private readonly _chatService: ChatService<WebSocketUser>;

    constructor(
        @inject(DI_TYPES.ChatService) chatService: ChatService<WebSocketUser>,
    ) {
        super();
        this._chatService = chatService;
        this.bindRouters([
            {
                path: '/send',
                middlewares: [new AuthWSMiddleware(this._chatService)],
                func: this.send,
            }
        ])
    }

    public async send(ws: ws, req: Request<{}, {}, UserRegisterDTO>, next: NextFunction): Promise<void> {
        const chatUser = new WebSocketUser();
        chatUser.ws = ws;
        this._chatService.handleOnConnection(chatUser);
        ws.send('id: ' + chatUser.id);
    }
}
