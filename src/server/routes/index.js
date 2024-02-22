import express from "express";
import heroRouter from "./routes.hero";

const apiRouter = express.Router();

apiRouter.use("/hero", heroRouter);

export default apiRouter;