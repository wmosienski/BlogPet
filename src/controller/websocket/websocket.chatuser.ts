import * as WebSocket from 'ws';

export class WebSocketUser implements BaseChatUser {
    public id: string;
    public ws: WebSocket;
    
    setReceiveHandler(handler: (...args: any[]) => void): void {
        this.ws.on('message', handler);
    }

    send(message: string): void {
        this.ws.send(message);
    }
}