import express from "express";
//import authRoutes from "./auth.routes.ts";
import bidsRoutes from "./bids.routes.ts";

const router = express.Router();
export default (): express.Router => {
  //authRoutes(router);
  bidsRoutes(router);
  return router;
};
