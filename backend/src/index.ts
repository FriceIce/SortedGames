import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// routes import.
import userRoutes from "./resources/users/users.routes";
import gameRoutes from "./resources/games/games.routes";

// dotenv
dotenv.config();

const app = express();
const port = process.env.PORT;

// Möjliggör användning av JSON samt uppsättning av cors med options.
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes.
app.use("/api", userRoutes);
app.use("/api", gameRoutes);

app.listen(port, () => console.log("Server is running from port", port));
