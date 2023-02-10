import { NextFunction, Request, Response } from 'express';
import { WebsocketRequestHandler } from 'express-ws';

export interface IWSMiddleware {
    execute: WebsocketRequestHandler;
}


