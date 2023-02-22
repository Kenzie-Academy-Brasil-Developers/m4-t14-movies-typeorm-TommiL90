import { iUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { createUserReturnSchema } from "../../schemas/user.schema";
import { QueryConfig, QueryResult } from "pg";

export const softDeleteService = async (userId: number): Promise<void> => {
  const id = userId;

  const queryString = `
    UPDATE
       users
    SET
       active = false
    WHERE
       id = $1
    RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};
