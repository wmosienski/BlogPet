import * as WebSocket from 'ws';
import { WebSocketUser } from "../../controller/websocket/websocket.chatuser";
import { injectable } from "inversify";
import { randomUUID } from "crypto";
import stream from "stream";
import { generateToken, verifyToken } from "@Utils/crypt";
import { IncomingMessage } from "http";
import { IChatService } from "@Service/interfaces/chat.interface";
import { config } from "@Utils/config/general.config";

@injectable()
export class ChatService<ChatUser extends BaseChatUser> implements IChatService {

    private _chatUsers: ChatUser[];

    constructor() {
        this._chatUsers = new Array<ChatUser>();
    }

    public async generateWebSocketToken(): Promise<string> {
        const webSocketToken = await generateToken({}, config.accessTokenExpireTime);

        return webSocketToken;
    }

    public handleOnConnection(chatUser: ChatUser): void {
        const id = randomUUID();
        chatUser.id = id;
        chatUser.setReceiveHandler(this.createReceiveHandler(id));
        this._chatUsers.push(chatUser);
    }

    createReceiveHandler = (id: string) => (data: string) => {
        const dataObject = JSON.parse(data);
        switch (dataObject.action) {
            case 'send': this.handleSend(id)(dataObject.toId, dataObject.message);
                break;
            default: break;
        }
    }
    
    handleSend = (id: string) => (toId: string, message: string) => {
        const receivers = this._chatUsers.filter(e => e.id === toId);
        if (!receivers.length) {
            return;
        }
        const receiver = receivers[0];
        receiver.send(`[user ${id}]: ${message}`);
    }
}

