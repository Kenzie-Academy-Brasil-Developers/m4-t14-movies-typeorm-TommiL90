import app from "./app";
import { startDatabase } from "./database";

app.listen(3000, async () => {
  console.log("Server is running!");
  await startDatabase();
});
