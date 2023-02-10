import { NextFunction, Request, Response, Router } from 'express';
import { WebsocketRequestHandler } from 'express-ws';
import { IMiddleware } from './middleware.interface';
import { IWSMiddleware } from './wsMiddleware.interface';

export interface IWSControllerRoute {

    path: string;

    func: WebsocketRequestHandler;

    middlewares?: IWSMiddleware[];

}

export type ExpressReturnType = Response<any, Record<string, any>>;