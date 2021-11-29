import { Router, Request, Response } from "express";
import { userList } from "./arrays";
import {
  createUser,
  login,
  createMessage,
  readMessage,
  updateMessage,
  deleteMessage,
} from "./functions";
import { validateLogin, requestProprietary, verifyToken, validateUser } from "./middlewares";
let router = Router();
router.use(requestProprietary);
router.use("/cadastro", validateUser);
router.use("/login", validateLogin);
router.get("/", (req: Request, res: Response) => {
  res.send({ user: userList });
});
router.post("/cadastro", (req: Request, res: Response) => {
  createUser(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});
router.get("/logout", function (req: Request, res: Response) {
  res.status(200).send({ token: null });
});

router.use("/messages", verifyToken);
router.post("/messages/:userId", (req: Request, res: Response) => {
  createMessage(req, res);
});
router.get("/messages/:userId", (req: Request, res: Response) => {
  readMessage(req, res);
});
router.put("/messages/:userId", (req: Request, res) => {
  updateMessage(req, res);
});

router.delete("/messages/:userId", (req: Request, res: Response) => {
  deleteMessage(req, res);
});
export { router };
