import { Router } from "express";
import { userLoginController } from "../controllers/users.controllers";
import { validateBodyMiddleware } from "../middlewares/users.middlewares";
import { loginUserSchema } from "../schemas/user.schema";

export const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validateBodyMiddleware(loginUserSchema),
  userLoginController
);
