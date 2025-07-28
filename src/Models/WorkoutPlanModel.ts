export interface IWorkoutPlan {
  _id?: string;
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

export interface IWeeklySchedule {
  monday?: IDayPlan;
  tuesday?: IDayPlan;
  wednesday?: IDayPlan;
  thursday?: IDayPlan;
  friday?: IDayPlan;
  saturday?: IDayPlan;
  sunday?: IDayPlan;
}

export interface IDayPlan {
  name: string; // e.g., "Push Day", "Back & Biceps", "Leg Day"
  muscleGroups: IMuscleGroup[];
  exercises: IPlannedExercise[];
  estimatedDuration: number; // minutes
  notes?: string;
  isRestDay: boolean;
}

export interface IMuscleGroup {
  name: string; // e.g., "chest", "back", "legs", "shoulders"
  primary: boolean; // Primary or secondary focus
  color?: string; // For UI display
}

export interface IPlannedExercise {
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

export interface IPlannedSet {
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
  FULL_BODY = 'full_body'
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