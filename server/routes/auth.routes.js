import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send("User logged in");
});

authRouter.post("/sign-in", (req, res) => {
  res.send("User registered");
});

export default authRouter;
