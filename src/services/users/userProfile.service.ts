import { iUser, tUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { createUserReturnSchema } from "../../schemas/user.schema";
import { QueryConfig, QueryResult } from "pg";

export const userProfileService = async (
  userId: number
): Promise<tUserWithoutPassword> => {
  const id = userId;

  const queryString = `
    SELECT *
    FROM 
        users
    WHERE
        id = $1
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<iUser> = await client.query(queryConfig);

  return createUserReturnSchema.parse(queryResult.rows[0]);
};
