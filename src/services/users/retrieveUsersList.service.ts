import { verify } from "jsonwebtoken";
import { client } from "../../database";
import { AppError } from "../../error";
import { tUsersListResult } from "../../interfaces/users.interfaces";
import { usersList } from "../../schemas/user.schema";

export const retrieveUsersListService = async () => {
  const queryString: string = `
  SELECT *
  FROM users u;
`;

  const queryResult: tUsersListResult = await client.query(queryString);

  return usersList.parse(queryResult.rows);
};
