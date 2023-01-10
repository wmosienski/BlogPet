import { IControllerRoute } from '@Controller/interfaces/controllerRouter.interface';
import { Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor() {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    protected bindRouters(routes: IControllerRoute[]): void {
        for (const route of routes) {

            const middleware = route.middlewares?.map((m) => m.execute.bind(m));
            const handler = route.func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;

            this._router[route.method](route.path, pipeline);
        }
    }
}