import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// TODO: Learn more about CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

// URL encoding configration
app.use(
  express.urlencoded({
    extended: true, // nested objects
    limit: "16kb",
  })
);

// accets static files saved in public
app.use(express.static("public"));

// cookie parser
app.use(cookieParser());

export default app;
