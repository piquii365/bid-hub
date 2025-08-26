import express from "express";
import admin from "../config/firebase.config.js";

export const decodeToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(token)
    .then((result) => {
      req.user = result as Express.FirebaseAuthToken;
      next();
    })
    .catch((error: unknown) => {
      return res.status(401).json({ message: "Unauthorized" });
    });
};
