import auth from "./auth";
import test from "./test";

const routes = (app) => {
  app.get("/", (req, res) =>
    res.send("Welcome to my Google Oauth express server")
  );

  app.use("/oauth", auth);
  app.use("/test", test);

  app.post("/testroute", (req, res) => {
    console.log(res.locals.decodedAccessToken);
    res.status(200).json({ message: "Access granted to this ressource" });
  });
};

export default routes;
