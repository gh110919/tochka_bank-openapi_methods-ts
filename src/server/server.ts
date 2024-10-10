import express, { json } from "express";
import cors from "cors";
import { router } from "./router";

((server) => {
  server.listen(443, async () => {
    try {
      server
        .use(json())
        .use(cors())
        .set("trust proxy", "linklocal")
        .use("/api", router);

      console.log(true);
    } catch (error) {
      console.error(error);
    }
  });
})(express());
