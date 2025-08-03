import { Router } from "express";
import userRouter from "./routers/UserRouter";
import WorkOutRouter from "./routers/WorkOutPlannerRouter";

const apirouter = Router();

apirouter.get('/', (_req, res) => {
  res.send('Gym App API Running!');
});

apirouter.use("/user", userRouter);
apirouter.use("/workout", WorkOutRouter);

export default apirouter;

