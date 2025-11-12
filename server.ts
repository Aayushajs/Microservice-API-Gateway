import dotenv from "dotenv";
import app from "./App";

// .env variables load karna
dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;


const server = app.listen(PORT, () => {
  console.log(` Gateway Server running on port http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server shutting down...");
  server.close(() => {
    console.log("Server closed successfully.");
    process.exit(0);
    });
});