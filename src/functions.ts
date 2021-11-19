import { Response, Request } from "express";
import { UserMessage, User } from "./class";
import { userList } from "./arrays";

const createUser = (req: Request, res: Response) => {
  let { name, email, password, repeatPassword } = req.body;
  if (password === repeatPassword) {
    let uId = "0"; // criar token
    let messagesList: Array<UserMessage> = [];
    const user: User = new User(uId, name, email, password, messagesList);

    userList.push(user);
    return res.status(200).send({ user, userList });
  } else {
    return res.status(418).send({ message: "Senhas não conferem!" });
  }
};
