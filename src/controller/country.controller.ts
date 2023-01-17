import { ICountryService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { CountryCreateDTO } from "@DTO/country/country-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";
import { CountryUpdateDTO } from "@DTO/country/country-update.dto";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class CountryController extends BaseController {
    private readonly _countryService: ICountryService;

    constructor(
        @inject(DI_TYPES.CountryService) countryService: ICountryService,
    ) {
        super();
        this._countryService = countryService;

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

    public async create(req: Request<{}, {}, CountryCreateDTO>, res: Response): Promise<void> {
        const result = await this._countryService.create(req.body);
        res.status(HTTPCodes.success.created).send({createdId: result});
    }

    public async read(req: Request<{id: number}, {}, {}>, res: Response): Promise<void> {
        const result = await this._countryService.read(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

    public async update(req: Request<{}, {}, CountryUpdateDTO>, res: Response): Promise<void> {
        const result = await this._countryService.update(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

    public async delete(req: Request<{id: number}, {}, {}>, res: Response): Promise<void> {
        const result = await this._countryService.delete(Number(req.params.id));
        res.status(HTTPCodes.success.created).send(result);
    }

}
