import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface Exercise extends Document{
    // gym exercise
    name: string; // e.g., "Bench Press", "Squat"
    description?: string; // Detailed description of the exercise
    secondaryMuscleGroups: string[]; // e.g., ["chest", "triceps"]
    muscles: string[]; // exact muscles targeted, e.g., ["pectoralis major", "triceps brachii"] 
    mainMuscleGroup: string; // e.g., "chest", "legs"

    equipment: string[]; // e.g., ["barbell", "dumbbell"]
    instructions: string[]; // Step-by-step instructions for performing the exercise
    imageUrl?: string; // URL to an image or video demonstrating the exercise
    videoUrl?: string; // URL to a video demonstrating the exercise
}

// schema for Exercise
const ExerciseSchema = new Schema<Exercise>({
    name: { type: String, required: true,},
    description: { type: String, default: "" },
    secondaryMuscleGroups: [{ type: String, required: true }],
    muscles: [{ type: String, required: true }],
    mainMuscleGroup: { type: String, required: true },
    equipment: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    imageUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" }
}, {
    timestamps: true
});
const ExerciseModel = mongoose.model<Exercise>('Exercise', ExerciseSchema);
export default ExerciseModel;
