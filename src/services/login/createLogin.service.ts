import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { iUser, tLogin } from "../../interfaces/users.interfaces";

export const createLoginService = async (
  payload: tLogin
): Promise<{ token: string }> => {
  const queryStringUserExist: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExist,
    values: [payload.email],
  };

  const queryResultUserExists: QueryResult<iUser> = await client.query(
    queryConfigUserExists
  );

  if (queryResultUserExists.rowCount === 0) {
    throw new AppError("Invalid email or password!", 401);
  }
  const user = queryResultUserExists.rows[0];
  const pwdMatch: boolean = await compare(payload.password, user.password);

  if (!pwdMatch) {
    throw new AppError("Invalid email or password!", 401);
  }

  const token: string = sign(
    { admin: user.admin },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject: String(user.id) }
  );

  return { token };
};
