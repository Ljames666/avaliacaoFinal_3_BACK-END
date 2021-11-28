import { Response, Request, json } from "express";
import { customAlphabet } from "nanoid";
import { UserMessage, User } from "./class";
import { userList } from "./arrays";

require("dotenv").config("KEY");
let uId = 1;
let createUser = (req: Request, res: Response) => {
  let { name, email, password, reppeatPassword } = req.body;
  if (password === reppeatPassword) {
    const token = "";
    let messagesList: Array<UserMessage> = [];
    const user: User = new User(uId, token, name, email, password, messagesList);
    userList.push(user);
    uId++;
    return res.status(201).send({ user, userList });
  } else {
    return res.status(418).send({ message: "Senhas não conferem!" });
  }
};

let login = (req: Request, res: Response) => {
  let { name, password } = req.body;

  const id = userList.findIndex((user) => user.name == name && user.password == password);
  if (id >= 0) {
    let userLogon = {
      name: userList[id].name,
      email: userList[id].email,
      id: userList[id].id,
    };
    const alphabet: any = process.env.KEY;

    const nanoid = customAlphabet(alphabet, 21);

    const token: string = nanoid();
    userList[id].token = token;

    return res.status(201).send({ userLogon, token });
  } else {
    return res.status(404).send();
  }
};
let messageId: number = 1;
let createMessage = (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  let { description, details } = req.body;
  const id = userList.findIndex((user) => user.id == userId);
  if (id >= 0) {
    let newMessage = new UserMessage(messageId, description, details);
    userList[id].message.push(newMessage);
    messageId++;
    res.status(201).send({ message: "success", newMessage, user: userList[id] });
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

let readMessage = (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const id = userList.findIndex((user) => user.id == userId);
  if (id >= 0) {
    res.status(200).send({
      message: `Mr. ${userList[id].name} these are your messages:`,
      messages: userList[id].message,
    });
  } else {
    res.status(404).send({ message: "Not found !" });
  }
};

let updateMessage = (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const id = userList.findIndex((user) => user.id == userId);
  const messageId = Number(req.query.message);
  let { description, details } = req.body;
  const mId = userList[id].message.findIndex((message) => message.id == messageId);

  if (id >= 0 && mId >= 0) {
    userList[id].message[mId].description = description;
    userList[id].message[mId].details = details;

    res.status(200).send({
      User: userList[id].name,
      Message: userList[id].message[mId],
      message: `Mr. ${userList[id].name} your message successfully modified!`,
    });
  } else {
    res.status(404).send({ message: "Not found!" });
  }
};

let deleteMessage = (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const id = userList.findIndex((user) => user.id === userId);
  const messageId = Number(req.query.message);

  const mId = userList[id].message.findIndex((message) => message.id === messageId);

  if (id >= 0) {
    userList[id].message.splice(mId, 1);
    res
      .status(200)
      .send({ message: `Mr. ${userList[id].name} your message was deleted successfully` });
  } else {
    res.status(404).send({ message: "Not found!" });
  }
};

export { createUser, login, createMessage, readMessage, updateMessage, deleteMessage };
