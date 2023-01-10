import { BlogController, UserController } from '@Controller/blog.controller';
import { DI_TYPES } from 'DI_TYPES';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from "inversify";
import * as bodyParser from 'body-parser';
import 'dotenv';

const DEFAULT_PORT = 5000;

@injectable()
export class App {
    private readonly _app: Express;
    private readonly _port: number;
    private readonly _blogController: BlogController;
    private _server: Server;

    constructor(
        @inject(DI_TYPES.BlogController) blogController: BlogController,
    ) {
        this._app = express();
        this._port = Number(process.env.PORT) || DEFAULT_PORT;
        this._blogController = blogController;
    }

    public useMiddleware(): void {
        this._app.use(bodyParser.urlencoded({ extended: false }))
        this._app.use(bodyParser.json());
    }

    public useRoutes(): void {
        this._app.use('/blog', this._blogController.router)
    }

    public async init(): Promise<void> {
        this.useMiddleware();
        this.useRoutes();
        this._server = this._app.listen(this._port);
    }
}
