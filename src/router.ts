import { Router, Request, Response } from "express";
import {
  createUser,
  login,
  createMessage,
  readMessage,
  updateMessage,
  deleteMessage,
} from "./functions";
let router = Router();

router.post("/cadastro", (req: Request, res: Response) => {
  createUser(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});
router.get("/logout", function (req: Request, res: Response) {
  res.status(200).send({ token: null });
});

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
