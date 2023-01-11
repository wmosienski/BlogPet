import { IPostService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { PostCreateDTO } from "@DTO/post/post-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";

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
            }
        ])
    }

    public async create(req: Request<{}, {}, PostCreateDTO>, res: Response): Promise<void> {
        const result = await this._postService.create(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

}
