import express from "express";
import { getBids } from "../controllers/bids.controller.ts";

export default (router: express.Router): express.Router => {
  router.route("/bids").get(getBids);
  return router;
};
