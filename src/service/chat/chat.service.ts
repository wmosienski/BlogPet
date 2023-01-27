import * as WebSocket from 'ws';
import { WebSocketUser } from "../../controller/websocket/websocket.chatuser";
import { injectable } from "inversify";
import { randomUUID } from "crypto";
import stream from "stream";
import { generateToken, verifyToken } from "@Utils/crypt";
import { IncomingMessage } from "http";
import { IChatService } from "@Service/interfaces/chat.interface";
import { config } from "@Utils/config/general.config";
import { ChatRoom } from './model/chatRoom';

@injectable()
export class ChatService<ChatUser extends BaseChatUser> implements IChatService {

    private _chatUsers: ChatUser[];
    private _chatRooms: ChatRoom<ChatUser>[];

    constructor() {
        this._chatUsers = new Array<ChatUser>();
        this._chatRooms = new Array<ChatRoom<ChatUser>>();
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
            case 'send': this.send(id)(dataObject.toId, dataObject.message);
                break;
            case 'createRoom': this.createRoom(id)();
                break;
            case 'enterRoom': this.enterRoom(id)(dataObject.roomId);
                break;
            case 'sendRoom': this.sendRoom(id)(dataObject.roomId, dataObject.message);
                break;
            default: break;
        }
    }
    
    send = (id: string) => (toId: string, message: string) => {
        const receivers = this._chatUsers.filter(e => e.id === toId);
        if (!receivers.length) {
            return;
        }
        const receiver = receivers[0];
        receiver.send(id, message);
    }

    createRoom = (id: string) => () => {
        const author = this._chatUsers.filter(e => e.id === id)[0];

        const chatRoom = new ChatRoom<ChatUser>();

        this._chatRooms.push(chatRoom);

        author.send('system', `created room: ${chatRoom.id}`);
    }

    enterRoom = (id: string) => (roomId: string) => {
        const author = this._chatUsers.filter(e => e.id === id)[0];

        const chatRoom = this._chatRooms.filter(e => e.id === roomId)[0];

        chatRoom.addUser(author);

        author.send('system', `entered room: ${chatRoom.id}`);
    }

    sendRoom = (id: string) => (roomId: string, message: string) => {
        const chatRoom = this._chatRooms.filter(e => e.id === roomId)[0];

        chatRoom.broadcast(id, message);
    }
}

