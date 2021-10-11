const express = require("express");
const router = express.Router();

import validateRequestJWT from "../middlewares/token-validation";
import auth from "./auth";
import test from "./test";

router.get("/", (req, res) =>
  res.send("Welcome to my Google Oauth express server")
);

router.use("/oauth", auth);
router.use("/test", test);

router.post("/testroute", validateRequestJWT, (req, res) => {
  console.log(res.locals.decodedAccessToken);
  res.status(200).json({ message: "Access granted to this ressource" });
});

export default router;
