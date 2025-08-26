import express from "express";
import { addProperty } from "../controllers/property.controller.ts";
import { decodeToken } from "../middleware/auth.middleware.ts";

export default (router: express.Router): express.Router => {
  router.route("/add-property").post(addProperty);
  return router;
};
