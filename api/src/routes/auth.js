import passport from "passport";

import AuthController from "../controllers/AuthController";

var express = require("express");
var router = express.Router();

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  AuthController.googleLogin
);

router.put("/google/refreshtoken", AuthController.refreshToken);

router.post("/google/logout", AuthController.logout);

router.get("/users/me", AuthController.getUser);

module.exports = router;
