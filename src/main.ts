import { BlogService } from "@Service";
import { App } from "app";
import { DI_TYPES } from "DI_TYPES";
import { Container, ContainerModule, interfaces } from "inversify";
import { IBlogService } from "@Service/interfaces";
import { BlogRepository } from "@Database/pg/blog.repository";
import { IBlogRepository } from "@Database/interfaces/blog.repository.interface";
import { BlogController } from "@Controller/blog.controller";

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<BlogController>(DI_TYPES.BlogController).to(BlogController).inSingletonScope();
    bind<IBlogService>(DI_TYPES.BlogService).to(BlogService).inSingletonScope();
    bind<IBlogRepository>(DI_TYPES.BlogRepository).to(BlogRepository).inSingletonScope();
    bind<App>(DI_TYPES.App).to(App);
});

function bootstrap(): IBootstrapReturn {
    const appContainer = new Container();

    appContainer.load(appBindings);

    const app = appContainer.get<App>(DI_TYPES.App);

    app.init();

    return {appContainer, app};
}

export const {app, appContainer} = bootstrap();

