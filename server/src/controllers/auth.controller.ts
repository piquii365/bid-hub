import admin from "firebase-admin";
import express from "express";
import { handleError } from "../utils/error.util.ts";
const serviceAccount = await import("../../serviceAccount.json", {
  assert: { type: "json" },
});
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export const signup = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    const useResponse = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: false,
    });
    res.status(201).json({ useResponse });
  } catch (error) {
    handleError(res, error);
  }
};
