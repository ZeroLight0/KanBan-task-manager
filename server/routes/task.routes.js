import { Router } from "express";

const taskRouter = Router();

taskRouter.get("/", (req, res) => {
  res.send("Task route");
});

taskRouter.post("/create", (req, res) => {
  res.send("Task created");
});

export default taskRouter;
