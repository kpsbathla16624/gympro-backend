import e, { Request, Response } from "express";

import mongoose from "mongoose";
import UserModel from "../Models/UserModel";



export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const userData = req.body;
    // Validate required fields
    if (!userData.email || !userData.userid) {
      res.status(400).json({
        success: false,
        message: "Email, and user ID are required",
        error: "VALIDATION_ERROR"
      });
      return;
    }
    // Create a new user instance
    const user = new UserModel({
        email: userData.email,
        userid: userData.userid,
        profile: userData.profile || {},
        phone: userData.phone,
        age: userData.age,
        stats: {
          totalWorkouts: 0,
          currentStreak: 0,
          longestStreak: 0,
          joinedAt: new Date()
        },
        preferences : userData.preferences || {
          notifications: {
            workoutReminders: true,
            friendRequests: true,
            achievements: true
          }
        },
        
        isActive: true,
        isEmailVerified: false,
        friends: [],
        friendRequests: {
          sent: [],
          received: []
        },
        createdAt: new Date(),
        updatedAt: new Date() ,
        
        
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user.toJSON()
    }
    );
    console.log("User registered successfully:", user);

    } catch (error : any) {
    console.error("Registration error:", error);
    
    // Handle mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "VALIDATION_ERROR",
        details: validationErrors
      });
      return;
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      res.status(409).json({
        success: false,
        message: `User with this ${duplicateField} already exists`,
        error: "DUPLICATE_KEY"
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}
// create profile 
export async function createProfile(req: Request, res: Response): Promise<void> {
  try {
    const { userId, profileData } = req.body;

    if (!userId || !profileData) {
      res.status(400).json({
        success: false,
        message: "User ID and profile data are required",
        error: "VALIDATION_ERROR"
      });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
      return;
    }

    user.profile = profileData;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile created successfully",
      data: user.toJSON()
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}

// get Profile 
export async function getProfile(req: Request, res: Response): Promise<void> {

  try {
      const {userId} = req.query;
      if (!userId) {
        res.status(400).json({
          success: false,
          message: "User ID is required",
          error: "VALIDATION_ERROR"
        });
        return;
      }
      const user = await UserModel.findOne({
        userid: userId
      });
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
          error: "USER_NOT_FOUND"
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: user.toJSON()
      });
  } catch (error) {
    console.error("Error retrieving profile:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
    
  }
}
