abstract class BaseChatUser {

    id: string;

    abstract setReceiveHandler(handler: Function): void;

    abstract send(message: string): void;
    
}