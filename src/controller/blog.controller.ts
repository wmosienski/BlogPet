import { IBlogService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";
import { BlogUpdateDTO } from "@DTO/blog/blog-update.dto";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class BlogController extends BaseController {
    private readonly _blogService: IBlogService;

    constructor(
        @inject(DI_TYPES.BlogService) blogService: IBlogService,
    ) {
        super();
        this._blogService = blogService;

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

    public async create(req: Request<{}, {}, BlogCreateDTO>, res: Response): Promise<void> {
        const result = await this._blogService.create(req.body);
        res.status(HTTPCodes.success.created).send({createdId: result});
    }

    public async read(req: Request<{id: string}, {}, {}>, res: Response): Promise<void> {
        const result = await this._blogService.read(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

    public async update(req: Request<{}, {}, BlogUpdateDTO>, res: Response): Promise<void> {
        const result = await this._blogService.update(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

    public async delete(req: Request<{id: string}, {}, {}>, res: Response): Promise<void> {
        const result = await this._blogService.delete(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

}
