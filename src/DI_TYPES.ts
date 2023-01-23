export const DI_TYPES = {
    UserService: Symbol.for('UserService'),
    UserController: Symbol.for('UserController'),
    UserRepository: Symbol.for('UserRepository'),

    BlogService: Symbol.for('BlogService'),
    BlogController: Symbol.for('BlogController'),
    BlogRepository: Symbol.for('BlogRepository'),

    PostService: Symbol.for('PostService'),
    PostController: Symbol.for('PostController'),
    PostRepository: Symbol.for('PostRepository'),

    AuthorService: Symbol.for('AuthorService'),
    AuthorController: Symbol.for('AuthorController'),
    AuthorRepository: Symbol.for('AuthorRepository'),

    CountryService: Symbol.for('CountryService'),
    CountryController: Symbol.for('CountryController'),
    CountryRepository: Symbol.for('CountryRepository'),

    App: Symbol.for('App'),

    WebSocketHandler: Symbol.for('WebSocketHandler'),
};
