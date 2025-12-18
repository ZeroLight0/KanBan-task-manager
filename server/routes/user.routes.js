import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

userRouter.post("/sign-up", (req, res) => {
  res.send("User registered");
});

userRouter.post("/sign-in", (req, res) => {
  res.send("User logged in");
});
export default userRouter;
