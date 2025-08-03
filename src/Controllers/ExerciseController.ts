import { Request, Response } from "express";
import ExerciseModel from "../Models/ExerciseModel";

export const getAllExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await ExerciseModel.find();
        res.status(200).json(exercises);
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch exercises", message: error.message });
    }
}
