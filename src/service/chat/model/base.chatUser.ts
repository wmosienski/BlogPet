abstract class BaseChatUser {

    id: string;

    abstract setReceiveHandler(handler: Function): void;

    abstract send(fromId: string, message: string): void;
    
}