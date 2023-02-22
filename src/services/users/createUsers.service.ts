import {
  iUserRequest,
  tUserResult,
  tUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { createUserReturnSchema } from "../../schemas/user.schema";
import { hash } from "bcryptjs";

export const createUsersService = async (
  userData: iUserRequest
): Promise<tUserWithoutPassword> => {
  const hashedPassword = await hash(userData.password, 10);
  const validatedBody: iUserRequest = { ...userData, password: hashedPassword };

  const queryString: string = format(
    `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING id, name, email, admin, active;
        `,
    Object.keys(validatedBody),
    Object.values(validatedBody)
  );

  const queryResult: tUserResult = await client.query(queryString);

  return createUserReturnSchema.parse(queryResult.rows[0]);
};
