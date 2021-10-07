import passport from "passport";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import TestController from "../controllers/TestController";

const routes = (app) => {
  app.get("/", (req, res) =>
    res.send("Welcome to my Google Oauth express server")
  );

  app.post(
    "/oauth/google",
    passport.authenticate("google-token", { session: false }),
    AuthController.googleLogin
  );

  app.put("/oauth/google/refreshtoken", AuthController.refreshToken);

  app.post("/oauth/google/logout", AuthController.logout);

  app.get("/users/me", UserController.getUser);

  app.post("/testroute", (req, res) => {
    console.log(res.locals.decodedAccessToken);

    res.status(200).json({ message: "Access granted to this ressource" });
  });

  app.get("/testfetch", TestController.testFetch);
};

export default routes;
