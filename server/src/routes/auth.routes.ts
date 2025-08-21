import express from "express";
import { signup, login } from "../controllers/auth.controller.ts";
import { 
  validateLogin, 
  validateRegistration, 
  handleValidationErrors 
} from "../middleware/validation.middleware.ts";

export default (router: express.Router): express.Router => {
  router.route("/auth/login").post(
    validateLogin,
    handleValidationErrors,
    login
  );
  
  router.route("/auth/signup").post(
    validateRegistration,
    handleValidationErrors,
    signup
  );
  
  return router;
};
