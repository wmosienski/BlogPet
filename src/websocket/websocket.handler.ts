import { IWebSocket } from "./interfaces/websocket.interface";
import * as WebSocket from 'ws';
import { WebSocketUser } from "./websocket.user";
import { injectable } from "inversify";
import { randomUUID } from "crypto";

@injectable()
export class WebSocketHandler implements IWebSocket {

    private _webSocketUsers: WebSocketUser[];

    constructor() {
        this._webSocketUsers = new Array<WebSocketUser>();
    }

    public handleOnConnection(ws: WebSocket): void {
        const id = randomUUID();
        this._webSocketUsers.push(new WebSocketUser(id, ws));
        ws.on('message', this.handleOnMessage(id));
        ws.send(`Successfully connected to BlogPet Chat. Your id: ${id}`);
    }

    handleOnMessage = (id: string) => (data: string) => {
        const dataObject = JSON.parse(data);
        switch (dataObject.action) {
            case 'send': this.handleSend(id)(dataObject.toId, dataObject.message);
                break;
            default: break;
        }
    }
    
    handleSend = (id: string) => (toId: string, message: string) => {
        const receivers = this._webSocketUsers.filter(e => e._id === toId);
        if (!receivers.length) {
            return;
        }
        const receiver = receivers[0];
        receiver._ws.send(`[user ${id}]: ${message}`);
    }

}

