import { randomUUID } from "crypto";

export class ChatRoom<ChatUser extends BaseChatUser> {
    id: string;
    chatUsers: ChatUser[];

    constructor() {
        this.id = randomUUID();
        this.chatUsers = new Array<ChatUser>();
    }

    addUser(chatUser: ChatUser) {
        this.chatUsers.push(chatUser);
    }

    broadcast(fromId: string, message: string) {
        this.chatUsers.forEach(chatUser => chatUser.send(fromId, message));
    }
}