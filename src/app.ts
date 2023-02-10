import { DI_TYPES } from 'DI_TYPES';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from "inversify";
import * as bodyParser from 'body-parser';
import 'dotenv';
import { AuthorController } from '@Controller/author.controller';
import { BlogController } from '@Controller/blog.controller';
import { CountryController } from '@Controller/country.controller';
import { PostController } from '@Controller/post.controller';
import { UserController } from '@Controller/user.controller';
import * as WebSocket from 'ws';
import * as http from 'http';
import stream from 'stream';
import expressWs from 'express-ws';
import { ChatWSController } from '@Controller/websocket/chat.ws.controller';
import { ChatController } from '@Controller/chat.controller';
const { app, getWss, applyTo } = expressWs(express());

const cookieParser = require('cookie-parser');

const DEFAULT_PORT = 5000;

@injectable()
export class App {
    private readonly _app: expressWs.Application;
    private readonly _port: number;
    private readonly _userController: UserController;
    private readonly _blogController: BlogController;
    private readonly _postController: PostController;
    private readonly _authorController: AuthorController;
    private readonly _countryController: CountryController;
    private readonly _chatController: ChatController;
    private readonly _chatWSController: ChatWSController;

    constructor(
        @inject(DI_TYPES.UserController) userController: UserController,
        @inject(DI_TYPES.BlogController) blogController: BlogController,
        @inject(DI_TYPES.PostController) postController: PostController,
        @inject(DI_TYPES.AuthorController) authorController: AuthorController,
        @inject(DI_TYPES.CountryController) countryController: CountryController,
        @inject(DI_TYPES.ChatController) chatController: ChatController,
        @inject(DI_TYPES.ChatWSController) chatWSController: ChatWSController,
    ) {
        this._app = app;
        this._port = Number(process.env.PORT) || DEFAULT_PORT;
        this._userController = userController;
        this._blogController = blogController;
        this._postController = postController;
        this._authorController = authorController;
        this._countryController = countryController;
        this._chatController = chatController;
        this._chatWSController = chatWSController;
    }

    public useMiddleware(): void {
        this._app.use(bodyParser.urlencoded({ extended: false }))
        this._app.use(cookieParser());
        this._app.use(bodyParser.json());
    }

    public useRoutes(): void {
        this._app.use('/user', this._userController.router);
        this._app.use('/blog', this._blogController.router);
        this._app.use('/post', this._postController.router);
        this._app.use('/author', this._authorController.router);
        this._app.use('/country', this._countryController.router);
        this._app.use('/chat', this._chatController.router);
        this._app.use('/chatWS', this._chatWSController.router);
    }

    public async init(): Promise<void> {
        this.useMiddleware();
        this.useRoutes();
        this._app.listen(this._port);
    }
}
