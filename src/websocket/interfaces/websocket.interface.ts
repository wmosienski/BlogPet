import * as WebSocket from 'ws';

export interface IWebSocket {
    handleOnConnection(ws: WebSocket): void;
}