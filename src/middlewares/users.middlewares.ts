import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../error";
import { iUser, tUserWithoutPassword } from "../interfaces/users.interfaces";
import { client } from "../database";
import { ZodTypeAny } from "zod/lib";
import { verify } from "jsonwebtoken";

export const verifyEmailExistMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const retrieveEmail = request.emailRetriever;
  const { email }: Pick<iUser, "email"> = request.body;

  const queryString: string = `
    SELECT
      email 
    FROM
      users u;
    `;

  const queryResult: QueryResult<Pick<iUser, "email">> = await client.query(queryString);
  const emails = queryResult.rows;

  let emailExists: boolean = emails.some((el) => el.email === email);
 

  if (request.method === "PATCH") {
    const filteredList = emails.filter((el) => el.email !== retrieveEmail);
    emailExists = filteredList.some((el) => el.email === email);
  }

  if (emailExists) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (
    request: Request,
    response: Response,
    next: NextFunction
  ): Response | void => {
    const validatedBody = schema.parse(request.body);

    request.body = validatedBody;

    return next();
  };

export const validateTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authToken = request.headers.authorization;

  if (!authToken || authToken.length < 7) {
    throw new AppError("Missing authorization token", 401);
  }
  const token: string = authToken.split(" ")[1];

  return verify(
    token,
    String(process.env.SECRET_KEY),
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }

      request.user = {
        id: parseInt(decoded.sub),
        admin: decoded.admin,
      };

      return next();
    }
  );
};

export const verifyIdUserMiddleWare = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(request.params.id);
  const idTokenUser = request.user.id;


  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE 
            id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<tUserWithoutPassword> = await client.query(
    queryConfig
  );

  if (queryResult.rowCount === 0) {
    return response.status(404).json({
      message: "Developer not exists!",
    });
  }

  if (request.method === "PUT") {
    return next();
  }

  if (request.method === "PATCH") {
    request.emailRetriever = queryResult.rows[0].email;
  }

  if ((request.method === "PATCH" || request.method === "DELETE") && request.user.admin === true) {
    return next();
  }

  if (id !== idTokenUser) {
    throw new AppError("Not permission for update or delete other users", 403);
  }

  return next()
};

export const verifyUserIsAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authtenticatedAdmin = request.user.admin;

  if (authtenticatedAdmin === false) {
    throw new AppError("User don`t have permission", 403);
  }

  return next();
};
