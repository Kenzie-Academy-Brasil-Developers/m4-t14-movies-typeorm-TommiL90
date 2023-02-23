import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./error";
import moviesRoutes from "./routes";


const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes)

app.use(errorHandler);

export default app;
