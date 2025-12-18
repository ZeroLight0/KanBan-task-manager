import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

export default app;
