import express, { json } from "express";
import cors from "cors";
import { router } from "./router";

((server) => {
  server.listen(80, () => {
    try {
      server
        .use(json())
        .use(cors())
        .set("trust proxy", "linklocal")
        .use("/api", router);

      console.log(true);
    } catch (error) {
      console.clear();
      console.error(error);
    }
  });
})(express());
