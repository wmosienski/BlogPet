import { UserLoginDTO } from "@DTO/user/user-login.dto";
import { UserRegisterDTO } from "@DTO/user/user-register.dto";
import { IUserService } from "@Service/interfaces/user.interface";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "./common/base.controller";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";
import 'reflect-metadata';
import { UserRefreshDTO } from "@DTO/user/user-refresh.dto";
import { config } from "@Utils/config/general.config";
import { AuthMiddleware } from "./middlewares/auth.middleware";

@CatchError(['constructor', 'bindRouters'])
@injectable()
export class UserController extends BaseController {
    private readonly _userService: IUserService;

    constructor(
        @inject(DI_TYPES.UserService) userService: IUserService,
    ) {
        super();
        this._userService = userService;

        this.bindRouters([
            {
                path: '/register',
                method: 'post',
                middlewares: [],
                func: this.register,
            },
            {
                path: '/login',
                method: 'post',
                middlewares: [],
                func: this.login,
            },
            {
                path: '/refresh',
                method: 'post',
                middlewares: [],
                func: this.refresh,
            },
            {
                path: '/dummy',
                method: 'post',
                middlewares: [new AuthMiddleware(this._userService)],
                func: this.dummy,
            }
        ])
    }

    public async register(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
        const result = await this._userService.register(req.body);

        res.status(HTTPCodes.success.created).send(result);
    }

    public async login(req: Request<{}, {}, UserLoginDTO>, res: Response): Promise<void> {
        const { accessToken, refreshToken } = await this._userService.login(req.body);

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: config.refreshTokenExpireTime });

        res.status(HTTPCodes.success.ok).send(accessToken);
    }

    public async refresh(req: Request<{}, {}, UserRefreshDTO>, res: Response): Promise<void> {
        const result = await this._userService.refresh(req.body);

        res.status(HTTPCodes.success.ok).send(result);
    }

    public async dummy(req: Request<{}, {}, {userId: any}>, res: Response): Promise<void> {
        res.status(HTTPCodes.success.ok).send(`succesfully passed auth middleware. user id: ${req.body.userId}`);
    }
}
