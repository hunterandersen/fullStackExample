import express from "express";
import cors from "cors";
import { PORT } from "./db";
//Grabs the apiRouter from the routes/index.js file
import apiRouter from "./routes";

const server = express();
//MIDDLEWARES
//Handle cross origin resource sharing to enable the frontend to make requests
server.use(cors());
//Process any incoming requests that contain json data on the body
server.use(express.json());
//Set up the custom routing
server.use("/api", apiRouter);

//Simple test route
server.get("/test", (req, res) => {
    res.status(200).end("Test successful");
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));