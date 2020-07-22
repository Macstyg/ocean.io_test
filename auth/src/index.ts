import http from "http";
import "express-async-errors";
import mongoose from "mongoose";

import App from "./App";

const port = process.env.PORT || 3000;

const createServer = () => {
  const server = http.createServer(App);
  server.listen(port);
  server.on("listening", onListening);
};

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected To MongoDB");
  } catch (err) {
    console.error(err);
  }

  createServer();
};

function onListening(): void {
  console.log(`Listening on port ${port}!!!`);
}

start();
