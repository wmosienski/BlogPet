import { IPostService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { PostCreateDTO } from "@DTO/post/post-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";
import { PostUpdateDTO } from "@DTO/post/post-update.dto";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class PostController extends BaseController {
    private readonly _postService: IPostService;

    constructor(
        @inject(DI_TYPES.PostService) postService: IPostService,
    ) {
        super();
        this._postService = postService;

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

    public async create(req: Request<{}, {}, PostCreateDTO>, res: Response): Promise<void> {
        const result = await this._postService.create(req.body);
        res.status(HTTPCodes.success.created).send({createdId: result});
    }

    public async read(req: Request<{id: string}, {}, {}>, res: Response): Promise<void> {
        const result = await this._postService.read(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

    public async update(req: Request<{}, {}, PostUpdateDTO>, res: Response): Promise<void> {
        const result = await this._postService.update(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

    public async delete(req: Request<{id: string}, {}, {}>, res: Response): Promise<void> {
        const result = await this._postService.delete(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

}
