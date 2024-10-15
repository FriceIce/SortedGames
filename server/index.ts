import express from "express";
import "dotenv/config";
import games from "./games.json";

//routes
import GamesRouter from "./resource/games/games.router";

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3020;

// routes
app.use("/api/", GamesRouter);

app.listen(PORT, () => console.log("The server is running on port", PORT));
