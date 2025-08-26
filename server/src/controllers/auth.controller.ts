import admin from "firebase-admin";
import express from "express";
import { handleError } from "../utils/error.util.ts";
import { validationResult } from "express-validator";
import { sanitizeInput } from "../middleware/validation.middleware.ts";



export const login = async (req: express.Request, res: express.Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    
    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Here you would typically verify the user credentials
    // For now, we'll just return a success response
    // In a real app, you'd check against your database
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: sanitizedEmail,
        // Add other user data as needed
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const signup = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};
