import express from "express";
import { handleError } from "../utils/error.util.ts";
import conn from "../config/db.config.js";
export const addProperty = async (
  req: express.Request,
  res: express.Response
) => {
  const connection = await conn.getConnection();
  //const { uid } = req.user as Express.FirebaseAuthToken;
  const {
    title,
    description,
    propertyType,
    location,
    startingPrice,
    reservePrice,
    bidType,
    startDate = new Date(Date.now()),
    endDate = new Date(Date.now() + 24 * 60 * 60 * 1000),
  } = req.body;
  try {
    await connection.query(
      "CALL proc_create_property(?,?,?,?,?,?,?,?,?,?, @inserted_property)",
      [
        "unknown",
        title,
        description,
        propertyType,
        location,
        startingPrice,
        reservePrice,
        bidType,
        startDate,
        endDate,
      ]
    );
    const [rows]: [any[], any] = await connection.query(
      "SELECT @inserted_property as insertedProperty"
    );
    res.status(201).json({
      message: "Property details saved",
      propertyId: rows[0]?.insertedProperty,
    });
  } catch (error) {
    handleError(res, error);
  } finally {
    connection.release();
  }
};
