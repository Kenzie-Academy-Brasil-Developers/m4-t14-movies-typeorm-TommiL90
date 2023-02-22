import { QueryResult } from "pg";
import { z } from "zod";
import {
  loginUserSchema,
  updateUserSchema,
  userSchema,
} from "../schemas/user.schema";

export type iUser = z.infer<typeof userSchema>;

export type iUserRequest = Pick<iUser, "name" | "email" | "password" | "admin">;

export type tUserWithoutPassword = Omit<iUser, "password">;

export type tUserResult = QueryResult<tUserWithoutPassword>;

export type tUsersListResult = QueryResult<tUserWithoutPassword[]>;

export type tLogin = z.infer<typeof loginUserSchema>;

export type tUserUpdateRequest = z.infer<typeof updateUserSchema>;
