import mongoose, { Schema, Document } from 'mongoose';
export interface IWorkoutPlan extends Document {
 
  userId: string; // Reference to User
  
  name: string;
  description?: string;
  
  // Weekly split configuration
  weeklySchedule: IWeeklySchedule;
  
  // Plan metadata
  isActive: boolean;
  isTemplate: boolean; // Can be used as template by other users
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // minutes per session
  
  // Plan stats
  stats: {
    totalSessions: number;
    completedSessions: number;
    lastUsed?: Date;
    createdFrom?: string; // If created from template
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IWeeklySchedule extends Document {
  monday?: IDayPlan;
  tuesday?: IDayPlan;
  wednesday?: IDayPlan;
  thursday?: IDayPlan;
  friday?: IDayPlan;
  saturday?: IDayPlan;
  sunday?: IDayPlan;
}

export interface IDayPlan extends Document {
  name: string; // e.g., "Push Day", "Back & Biceps", "Leg Day"
  muscleGroups: IMuscleGroup[];
  exercises: IPlannedExercise[];
  estimatedDuration: number; // minutes
  notes?: string;
  isRestDay: boolean;
}

export interface IMuscleGroup extends Document {
  name: string; // e.g., "chest", "back", "legs", "shoulders"
  primary: boolean; // Primary or secondary focus
  color?: string; // For UI display
}

export interface IPlannedExercise  extends Document {
  exerciseId: string; // Reference to Exercise
  exerciseName: string; // Denormalized for quick access
  muscleGroup: string;
  
  // Planned sets configuration
  sets: IPlannedSet[];
  
  // Exercise order in the workout
  order: number;
  
  // Optional configurations
  restTime?: number; // seconds between sets
  notes?: string;
  isSuperset?: boolean;
  supersetGroup?: number;
}

export interface IPlannedSet  extends Document {
  type: 'normal' | 'warmup' | 'dropset' | 'failure' | 'amrap';
  targetReps?: number;
  repRange?: {
    min: number;
    max: number;
  };
  targetWeight?: number;
  targetRPE?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
}

// Enum for muscle groups
export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  LEGS = 'legs',
  QUADS = 'quads',
  HAMSTRINGS = 'hamstrings',
  GLUTES = 'glutes',
  CALVES = 'calves',
  ABS = 'abs',
  CARDIO = 'cardio',
  FULL_BODY = 'full_body',
  CORE = 'core',
  TRAPS = 'traps',
  FOREARMS = 'forearms'
}


// Enum for days of the week
export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

// moongose schemas 

const MuscleGroupSchema = new Schema<IMuscleGroup>({
  name: { type: String, required: true },
  primary: { type: Boolean, default: false },
  color: { type: String }
});
const PlannedSetSchema = new Schema<IPlannedSet>({
  type: { type: String, enum: ['normal', 'warmup', 'dropset', 'failure', 'amrap'], required: true },
  targetReps: { type: Number },
  repRange: {
    min: { type: Number },
    max: { type: Number }
  },
  targetWeight: { type: Number },
  targetRPE: { type: Number },
  notes: { type: String }
});

const PlannedExerciseSchema = new Schema<IPlannedExercise>({
  exerciseId: { type: String, required: true },
  exerciseName: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  sets: [PlannedSetSchema],
  order: { type: Number, required: true },
  restTime: { type: Number },
  notes: { type: String },
  isSuperset: { type: Boolean, default: false },
  supersetGroup: { type: Number }
});
const DayPlanSchema = new Schema<IDayPlan>({
  name: { type: String, required: true },
  muscleGroups: [MuscleGroupSchema],
  exercises: [PlannedExerciseSchema],
  estimatedDuration: { type: Number, required: true },
  notes: { type: String },
  isRestDay: { type: Boolean, default: false }
});
const WeeklyScheduleSchema = new Schema<IWeeklySchedule>({
  monday: DayPlanSchema,
  tuesday: DayPlanSchema,
  wednesday: DayPlanSchema,
  thursday: DayPlanSchema,
  friday: DayPlanSchema,
  saturday: DayPlanSchema,
  sunday: DayPlanSchema
});
const WorkoutPlanSchema = new Schema<IWorkoutPlan>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  weeklySchedule: { type: WeeklyScheduleSchema, required: true },
  isActive: { type: Boolean, default: true },
  isTemplate: { type: Boolean, default: false },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  estimatedDuration: { type: Number, required: true },
  stats: {
    totalSessions: { type: Number, default: 0 },
    completedSessions: { type: Number, default: 0 },
    lastUsed: { type: Date },
    createdFrom: { type: String }
  }
}, {
  timestamps: true
});
const WorkoutPlanModel = mongoose.model<IWorkoutPlan>('WorkoutPlan', WorkoutPlanSchema);
export default WorkoutPlanModel;















// Popular workout split templates
export const WORKOUT_SPLIT_TEMPLATES = {
  PUSH_PULL_LEGS: {
    name: 'Push/Pull/Legs',
    description: '6-day split focusing on movement patterns',
    schedule: {
      monday: { name: 'Push', muscleGroups: ['chest', 'shoulders', 'triceps'] },
      tuesday: { name: 'Pull', muscleGroups: ['back', 'biceps'] },
      wednesday: { name: 'Legs', muscleGroups: ['quads', 'hamstrings', 'glutes', 'calves'] },
      thursday: { name: 'Push', muscleGroups: ['chest', 'shoulders', 'triceps'] },
      friday: { name: 'Pull', muscleGroups: ['back', 'biceps'] },
      saturday: { name: 'Legs', muscleGroups: ['quads', 'hamstrings', 'glutes', 'calves'] },
      sunday: { name: 'Rest', isRestDay: true }
    }
  },
  UPPER_LOWER: {
    name: 'Upper/Lower',
    description: '4-day split alternating upper and lower body',
    schedule: {
      monday: { name: 'Upper Body', muscleGroups: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
      tuesday: { name: 'Lower Body', muscleGroups: ['quads', 'hamstrings', 'glutes', 'calves'] },
      wednesday: { name: 'Rest', isRestDay: true },
      thursday: { name: 'Upper Body', muscleGroups: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
      friday: { name: 'Lower Body', muscleGroups: ['quads', 'hamstrings', 'glutes', 'calves'] },
      saturday: { name: 'Rest', isRestDay: true },
      sunday: { name: 'Rest', isRestDay: true }
    }
  },
  FULL_BODY: {
    name: 'Full Body',
    description: '3-day full body workout',
    schedule: {
      monday: { name: 'Full Body A', muscleGroups: ['full_body'] },
      tuesday: { name: 'Rest', isRestDay: true },
      wednesday: { name: 'Full Body B', muscleGroups: ['full_body'] },
      thursday: { name: 'Rest', isRestDay: true },
      friday: { name: 'Full Body C', muscleGroups: ['full_body'] },
      saturday: { name: 'Rest', isRestDay: true },
      sunday: { name: 'Rest', isRestDay: true }
    }
  }
} as const;