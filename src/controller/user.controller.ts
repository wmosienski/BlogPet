import { UserLoginDTO } from "@DTO/user/user-login.dto";
import { UserLogoutDTO } from "@DTO/user/user-logout.dto";
import { UserRegisterDTO } from "@DTO/user/user-register.dto";
import { IUserService } from "@Service/interfaces/user.interface";
import { DI_TYPES } from "DI_TYPES";
import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "./common/base.controller";
import { CatchError } from "./helpers/catch.error.decorator";
import { HTTPCodes } from "./helpers/http-codes";
import 'reflect-metadata';
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
                path: '/logout',
                method: 'post',
                middlewares: [],
                func: this.logout,
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
                middlewares: [new AuthMiddleware()],
                func: this.dummy,
            }
        ])
    }

    public async register(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
        const result = await this._userService.register(req.body);

        res.status(HTTPCodes.success.created).send(result);
    }

    public async login(req: Request<{}, {}, UserLoginDTO>, res: Response): Promise<void> {
        const cookies = req.cookies;

        if (cookies?.jwt) {
            await this._userService.logout(cookies.jwt);

            res.clearCookie('jwt');
        }

        const { accessToken, refreshToken } = await this._userService.login(req.body);

        res.cookie('jwt', refreshToken, { maxAge: config.refreshTokenExpireTime });

        res.status(HTTPCodes.success.ok).send(accessToken);
    }

    public async logout(req: Request<{}, {}, {}>, res: Response): Promise<void> {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            res.status(HTTPCodes.client_errors.unauthorized).send("no jwt cookie");

            return;
        }

        await this._userService.logout(cookies.jwt);

        res.clearCookie('jwt');

        res.status(HTTPCodes.success.ok).send('logout succesfull');
    }

    public async refresh(req: Request<{}, {}, {}>, res: Response): Promise<void> {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            res.status(HTTPCodes.client_errors.unauthorized).send("no jwt cookie");

            return;
        }

        const accessToken = await this._userService.refresh(cookies.jwt);

        res.status(HTTPCodes.success.ok).send(accessToken);
    }

    public async dummy(req: Request<{}, {}, {userId: any}>, res: Response): Promise<void> {
        res.status(HTTPCodes.success.ok).send(`succesfully passed auth middleware.`);
    }
}
