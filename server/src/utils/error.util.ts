import express from "express";

export const handleError = (res: express.Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};
