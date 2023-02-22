import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./error";
import { loginRoutes } from "./routes/login.routes";
import { userRoutes } from "./routes/users.routes";

const app: Application = express();
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
