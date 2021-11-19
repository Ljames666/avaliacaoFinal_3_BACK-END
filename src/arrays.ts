import { User, UserMessage } from "./class";

let userList: Array<User> = [];

const admin: User = new User("1", "admin", "admin@admin", "admin", []);
userList.push(admin);

const adminMessage: UserMessage = new UserMessage("1", "teste", "funciona o back-end");
userList[0].message.push(adminMessage);

export { userList };
