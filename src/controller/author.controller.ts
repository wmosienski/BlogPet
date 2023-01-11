import { IAuthorService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { AuthorCreateDTO } from "@DTO/author/author-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";

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
            }
        ])
    }

    public async create(req: Request<{}, {}, AuthorCreateDTO>, res: Response): Promise<void> {
        const result = await this._authorService.create(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

}
