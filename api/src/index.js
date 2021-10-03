import cors from "cors";
import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cookieParser from "cookie-parser";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import HttpError from "./models/http-error";
import "./services/google";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

const validateRequestJWT = (req, res, next) => {
  var accessToken = req.cookies.accessToken;
  var refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    try {
      res.locals.decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_ACCESS_TOKEN
      );
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        if (refreshToken) {
          try {
            jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN);
            new HttpError("Access token expired", 401);
            res.status(401).json({ message: "Access token expired" });
          } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
              new HttpError("Access and refresh token expired", 401);
              res
                .status(401)
                .json({ message: "Access and refresh token expired" });
            } else {
              new HttpError("Refresh token not valid", 400);
              res.status(400).json({ message: "Refresh token not valid" });
            }
          }
        } else {
          new HttpError("Refresh token not valid", 400);
          res.status(400).json({ message: "Refresh token not valid" });
        }
      } else {
        new HttpError("Access token not valid", 400);
        res.status(400).json({ message: "Access token not valid" });
      }
    }
  } else {
    new HttpError("Access token not valid", 400);
    res.status(400).json({ message: "Access token not valid" });
  }
};

app.use("/testroute", validateRequestJWT);
app.use("/users/me", validateRequestJWT);

routes(app);

const port = process.env.PORT || 2000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
