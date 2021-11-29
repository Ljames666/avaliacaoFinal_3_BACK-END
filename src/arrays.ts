import { User, UserMessage } from "./class";

let userList: Array<User> = [];

const admin: User = new User(3, "", "admin", "admin", "admin@admin", "admin", []);
userList.push(admin);

const adminMessage: UserMessage = new UserMessage(3, "teste", "funciona o back-end");
userList[0].message.push(adminMessage);

export { userList };
