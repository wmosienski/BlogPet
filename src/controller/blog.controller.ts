import { IBlogService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";

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
            }
        ])
    }

    public async create(req: Request<{}, {}, BlogCreateDTO>, res: Response): Promise<void> {
        const result = await this._blogService.create(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

}
