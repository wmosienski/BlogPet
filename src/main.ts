import { BlogService } from "@Service";
import { App } from "app";
import { DI_TYPES } from "DI_TYPES";
import { Container, ContainerModule, interfaces } from "inversify";
import { IAuthorService, IBlogService, ICountryService, IPostService } from "@Service/interfaces";
import { BlogRepository } from "@Database/pg/blog.repository";
import { IBlogRepository } from "@Database/interfaces/blog.repository.interface";
import { BlogController } from "@Controller/blog.controller";
import { initPG } from "@Database/pg/pg";
import { PostController } from "@Controller/post.controller";
import { PostService } from "@Service/post.service";
import { PostRepository } from "@Database/pg/post.repository";
import { IPostRepository } from "@Database/interfaces/post.repository.interface";
import { AuthorController } from "@Controller/author.controller";
import { CountryController } from "@Controller/country.controller";
import { IAuthorRepository } from "@Database/interfaces/author.repository.interface";
import { ICountryRepository } from "@Database/interfaces/country.repository.interface";
import { AuthorRepository } from "@Database/pg/author.repository";
import { CountryRepository } from "@Database/pg/country.repository";
import { AuthorService } from "@Service/author.service";
import { CountryService } from "@Service/country.service";
import { setupPG } from "setup.pg";
import { UserController } from "@Controller/user.controller";
import { IUserRepository } from "@Database/interfaces/user.repository.interface";
import { UserRepository } from "@Database/pg/user.repository";
import { IUserService } from "@Service/interfaces/user.interface";
import { UserService } from "@Service/user.service";

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserController>(DI_TYPES.UserController).to(UserController).inSingletonScope();
    bind<IUserService>(DI_TYPES.UserService).to(UserService).inSingletonScope();
    bind<IUserRepository>(DI_TYPES.UserRepository).to(UserRepository).inSingletonScope();

    bind<BlogController>(DI_TYPES.BlogController).to(BlogController).inSingletonScope();
    bind<IBlogService>(DI_TYPES.BlogService).to(BlogService).inSingletonScope();
    bind<IBlogRepository>(DI_TYPES.BlogRepository).to(BlogRepository).inSingletonScope();

    bind<PostController>(DI_TYPES.PostController).to(PostController).inSingletonScope();
    bind<IPostService>(DI_TYPES.PostService).to(PostService).inSingletonScope();
    bind<IPostRepository>(DI_TYPES.PostRepository).to(PostRepository).inSingletonScope();

    bind<AuthorController>(DI_TYPES.AuthorController).to(AuthorController).inSingletonScope();
    bind<IAuthorService>(DI_TYPES.AuthorService).to(AuthorService).inSingletonScope();
    bind<IAuthorRepository>(DI_TYPES.AuthorRepository).to(AuthorRepository).inSingletonScope();

    bind<CountryController>(DI_TYPES.CountryController).to(CountryController).inSingletonScope();
    bind<ICountryService>(DI_TYPES.CountryService).to(CountryService).inSingletonScope();
    bind<ICountryRepository>(DI_TYPES.CountryRepository).to(CountryRepository).inSingletonScope();

    bind<App>(DI_TYPES.App).to(App);
});

function bootstrap(): IBootstrapReturn {
    const appContainer = new Container();

    appContainer.load(appBindings);

    const app = appContainer.get<App>(DI_TYPES.App);

    app.init();

    initPG()
        .then(setupPG)

    return {appContainer, app};
}

export const {app, appContainer} = bootstrap();

