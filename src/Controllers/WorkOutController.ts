
// WorkOutRouter.post("/CreateWorkoutPlan");
// WorkOutRouter.get("/GetWorkoutPlans");
// WorkOutRouter.get("/GetWorkoutPlanById");
// WorkOutRouter.delete("/DeleteWorkoutPlan");
// WorkOutRouter.put("/UpdateWorkoutPlan");

import { Request, Response } from "express";
import WorkoutPlanModel from "../Models/WorkoutPlanModel";

export async function CreateWorkoutPlan(req:Request , res:Response) {
    const workoutPlanData = req.body;

    try {
        const newWorkoutPlan = await WorkoutPlanModel.create(workoutPlanData);
        res.status(201).json(newWorkoutPlan);
    } catch (error : any) {
        res.status(500).json({ error: "Failed to create workout plan",
            message: error.message });
    }

}
export async function GetWorkoutPlans(req: Request, res: Response) {
    try {
        const{userId} = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        // Fetch workout plans for the user
        const workoutPlans = await WorkoutPlanModel.find({ userId });
        res.status(200).json(workoutPlans);
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch workout plans", message: error.message });
    }
}
export async function GetWorkoutPlanById(req: Request, res: Response) {
    const { id } = req.query;

    try {
        const workoutPlan = await WorkoutPlanModel.findById(id);
        if (!workoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        res.status(200).json(workoutPlan);
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch workout plan", message: error.message });
    }
}
export async function DeleteWorkoutPlan(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const deletedWorkoutPlan = await WorkoutPlanModel.findByIdAndDelete(id);
        if (!deletedWorkoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        res.status(200).json({ message: "Workout plan deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to delete workout plan", message: error.message });
    }
}
export async function UpdateWorkoutPlan(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedWorkoutPlan = await WorkoutPlanModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedWorkoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        res.status(200).json(updatedWorkoutPlan);
    } catch (error: any) {
        res.status(500).json({ error: "Failed to update workout plan", message: error.message });
    }
}
