// User Interface Definition for Gym App

import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  phone?: string; // Optional, for future use
  userid: string; // user id from firebase auth 
  
  profile?: {
    firstName: string;
    lastName: string;
    age?: number;
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    height?: {
      value: number;
      unit: 'cm' | 'ft';
    };
    weight?: {
      value: number;
      unit: 'kg' | 'lbs';
    };
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
    bio?: string;
    profilePicture?: string; // URL
  };

  preferences?: {
    weightUnit: 'kg' | 'lbs';
    timeFormat: '12h' | '24h';
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      workoutReminders: boolean;
      friendRequests: boolean;
      achievements: boolean;
    };
  };

  // Account status
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  // Friend system
  friends: IFriend[];
  friendRequests: {
    sent: IFriendRequest[];
    received: IFriendRequest[];
  };

  // Stats
  stats: {
    totalWorkouts: number;
    currentStreak: number;
    longestStreak: number;
    lastWorkoutDate?: Date;
    joinedAt: Date;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IFriend {
  user: string; // ObjectId reference
  addedAt: Date;
}

export interface IFriendRequest {
  to?: string;   // For sent requests
  from?: string; // For received requests
  sentAt?: Date;
  receivedAt?: Date;
}

// moongose schema definition
const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  phone: { 
    type: String, 
    unique: true, 
    sparse: true // This allows multiple null/undefined values
  },
  userid: { type: String, required: true },
  
  profile: {
    firstName: { type: String }, 
    lastName: { type: String },  
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
    height: {
      value: { type: Number, min: 0 },
      unit: { type: String, enum: ['cm', 'ft'] }
    },
    weight: {
      value: { type: Number, min: 0 },
      unit: { type: String, enum: ['kg', 'lbs'] }
    },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    bio: { type: String, maxlength: 500 },
    profilePicture: { type: String, match: /^https?:\/\// }
  },
  
  preferences: {
    weightUnit: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
    timeFormat: { type: String, enum: ['12h', '24h'], default: '24h' },
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    notifications: {
      workoutReminders: { type: Boolean, default: true },
      friendRequests: { type: Boolean, default: true },
      achievements: { type: Boolean, default: true }
    }
  },
  
  // Account status
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  
  // Friend system
  friends: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    addedAt: { type: Date, default: Date.now } 
  }],
  friendRequests: {
    sent: [{ 
      to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      sentAt: { type: Date, default: Date.now } 
    }],
    received: [{ 
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      receivedAt: { type: Date, default: Date.now } 
    }]
  },
  
  // Stats
  stats: {
    totalWorkouts: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastWorkoutDate: { type: Date },
    joinedAt: { type: Date, default: Date.now }
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



// Pre-save middleware to update updatedAt
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});



const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;

