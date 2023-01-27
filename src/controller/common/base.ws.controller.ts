import { IControllerRoute } from '@Controller/interfaces/controllerRouter.interface';
import { injectable } from 'inversify';
import expressWs, { WebsocketRequestHandler } from 'express-ws';
import 'reflect-metadata';
import { Router } from 'express';
import { IWSControllerRoute } from '@Controller/interfaces/wsControllerRouter.interface';

@injectable()
export abstract class BaseWSController {
    private readonly _router: expressWs.Router;

    constructor() {
        this._router = Router() as expressWs.Router;
    }

    get router() {
        return this._router;
    }

    protected bindRouters(routes: IWSControllerRoute[]): void {
        for (const route of routes) {

            const middleware = route.middlewares?.map((m) => m.execute.bind(m));
            const handler = route.func.bind(this);
            const pipeline: WebsocketRequestHandler[] = middleware ? [...middleware, handler] : [handler];

            this._router.ws(route.path, ...pipeline);
        }
    }

}