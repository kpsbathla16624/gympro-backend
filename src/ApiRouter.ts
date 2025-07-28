import { Router } from "express";
import userRouter from "./routers/UserRouter";

const apirouter = Router();

apirouter.get('/', (_req, res) => {
  res.send('Gym App API Running!');
});

apirouter.use("/user", userRouter);

export default apirouter;

