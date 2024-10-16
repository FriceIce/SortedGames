import express from "express";
import "dotenv/config";
import games from "./games.json";
import cors from "cors";

//routes
import GamesRouter from "./resource/games/games.router";

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3020;

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes
app.use("/api/", GamesRouter);

app.listen(PORT, () => console.log("The server is running on port", PORT));
