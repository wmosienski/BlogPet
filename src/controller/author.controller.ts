import { IAuthorService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { AuthorCreateDTO } from "@DTO/author/author-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";
import { AuthorUpdateDTO } from "@DTO/author/author-update.dto";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class AuthorController extends BaseController {
    private readonly _authorService: IAuthorService;

    constructor(
        @inject(DI_TYPES.AuthorService) authorService: IAuthorService,
    ) {
        super();
        this._authorService = authorService;

        this.bindRouters([
            {
                path: '/create',
                method: 'post',
                middlewares: [],
                func: this.create,
            },
            {
                path: '/read/:id',
                method: 'get',
                middlewares: [],
                func: this.read,
            },
            {
                path: '/update',
                method: 'put',
                middlewares: [],
                func: this.update,
            },
            {
                path: '/delete/:id',
                method: 'delete',
                middlewares: [],
                func: this.delete,
            }
        ])
    }

    public async create(req: Request<{}, {}, AuthorCreateDTO>, res: Response): Promise<void> {
        const result = await this._authorService.create(req.body);
        res.status(HTTPCodes.success.created).send({createdId: result});
    }

    public async read(req: Request<{id: number}, {}, {}>, res: Response): Promise<void> {
        const result = await this._authorService.read(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

    public async update(req: Request<{}, {}, AuthorUpdateDTO>, res: Response): Promise<void> {
        const result = await this._authorService.update(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

    public async delete(req: Request<{id: number}, {}, {}>, res: Response): Promise<void> {
        const result = await this._authorService.delete(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

}
