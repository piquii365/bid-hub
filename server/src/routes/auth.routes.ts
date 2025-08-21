import express from "express";
import { signup } from "../controllers/auth.controller.ts";

export default (router: express.Router): express.Router => {
  router.route("/auth/signup").post(signup);
  return router;
};
