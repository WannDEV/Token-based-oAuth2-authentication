import cors from "cors";
import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import cookieParser from "cookie-parser";

import "./db/index";
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

app.use(router);

const port = process.env.PORT || 2000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
