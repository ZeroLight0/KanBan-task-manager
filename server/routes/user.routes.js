import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("User route");
});

userRouter.post("/sign-up", (req, res) => {
  res.send("User registered");
});

userRouter.post("/sign-in", (req, res) => {
  res.send("User logged in");
});
export default userRouter;
