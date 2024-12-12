//required("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR: ", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!! :", error);
  });

/* First Approach to connect to database

import express from "express";
const app = expresss();

async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${mydatabase}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error); // DB connected, but error in express, app not able to start
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
};
*/
