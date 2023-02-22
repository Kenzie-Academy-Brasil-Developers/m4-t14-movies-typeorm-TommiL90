import {
  iUserRequest,
  tUserResult,
  tUserUpdateRequest,
  tUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { createUserReturnSchema } from "../../schemas/user.schema";
import { QueryConfig } from "pg";

export const updateUserService = async (
  userData: tUserUpdateRequest,
  id: number
): Promise<tUserWithoutPassword> => {
  const validatedBody = userData;

  const queryString: string = format(
    `
    UPDATE
        users
    SET(%I) = ROW(%L)
    WHERE
        id = $1
    RETURNING *;
        `,
    Object.keys(validatedBody),
    Object.values(validatedBody)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: tUserResult = await client.query(queryConfig);

  return createUserReturnSchema.parse(queryResult.rows[0]);
};
