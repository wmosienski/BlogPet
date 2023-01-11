import { ICountryService } from "@Service/interfaces";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./common/base.controller";
import 'reflect-metadata';
import { CountryCreateDTO } from "@DTO/country/country-create.dto";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";

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
            }
        ])
    }

    public async create(req: Request<{}, {}, CountryCreateDTO>, res: Response): Promise<void> {
        const result = await this._countryService.create(req.body);
        res.status(HTTPCodes.success.created).send(result);
    }

}
