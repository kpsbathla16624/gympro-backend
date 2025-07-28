import { Router } from "express";

const WorkOutRouter = Router();

WorkOutRouter.post("/CreateWorkoutPlan");
WorkOutRouter.get("/GetWorkoutPlans");
WorkOutRouter.delete("/DeleteWorkoutPlan");
WorkOutRouter.put("/UpdateWorkoutPlan");


export default WorkOutRouter;