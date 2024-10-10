import { Router } from "express";

export const router = ((router): Router => {
  return router.get("/token", (_req, res) => {
    res.status(200).send("token");
  });
})(Router());
