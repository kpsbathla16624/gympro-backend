import { create } from "domain";
import { Router } from "express";
import { CreateWorkoutPlan, DeleteWorkoutPlan, GetWorkoutPlanById, GetWorkoutPlans, UpdateWorkoutPlan } from "../Controllers/WorkOutController";
import { getAllExercises } from "../Controllers/ExerciseController";


const WorkOutRouter = Router();

WorkOutRouter.post("/CreateWorkoutPlan", CreateWorkoutPlan);
WorkOutRouter.get("/GetWorkoutPlans", GetWorkoutPlans);
WorkOutRouter.get("/GetWorkoutPlanById/", GetWorkoutPlanById);
WorkOutRouter.delete("/DeleteWorkoutPlan", DeleteWorkoutPlan);
WorkOutRouter.put("/UpdateWorkoutPlan", UpdateWorkoutPlan);

WorkOutRouter.get("/getAllExercises", getAllExercises);


export default WorkOutRouter;