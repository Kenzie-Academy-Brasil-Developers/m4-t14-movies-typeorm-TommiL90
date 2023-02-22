import { Router } from "express";
import {
  createUsersController,
  recoverUserController,
  retrieveUsersListController,
  softDeleteController,
  updateUserController,
  userLoginController,
  userProfileController,
} from "../controllers/users.controllers";
import {
  validateBodyMiddleware,
  validateTokenMiddleware,
  verifyEmailExistMiddleware,
  verifyIdUserMiddleWare,
  verifyUserIsAdmin,
} from "../middlewares/users.middlewares";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyEmailExistMiddleware,
  validateBodyMiddleware(createUserSchema),
  createUsersController
);

userRoutes.post(
  "/login",
  validateBodyMiddleware(loginUserSchema),
  userLoginController
);

userRoutes.get(
  "",
  validateTokenMiddleware,
  verifyUserIsAdmin,
  retrieveUsersListController
);

userRoutes.get("/profile", validateTokenMiddleware, userProfileController);

userRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  verifyIdUserMiddleWare,
  verifyEmailExistMiddleware,
  validateBodyMiddleware(updateUserSchema),
  updateUserController
);

userRoutes.delete(
  "/:id",
  validateTokenMiddleware,
  verifyIdUserMiddleWare,
  softDeleteController
);

userRoutes.put(
  "/:id/recover",
  validateTokenMiddleware,
  verifyIdUserMiddleWare,
  verifyUserIsAdmin,
  recoverUserController
);
