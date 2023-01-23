import * as WebSocket from 'ws';

export class WebSocketUser {
    public readonly _id: string;
    public readonly _ws: WebSocket;

    constructor(id: string, ws: WebSocket) {
        this._id = id;
        this._ws = ws;
    }
}