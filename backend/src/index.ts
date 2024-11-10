import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "./config/databaseConfig";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import router from "./router/index";
import errorHandler from "./middleware/errorHandlerMiddleware";

dotenv.config();

const app = express();

mongoose();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/backend/Public", express.static(path.join(__dirname, "Public")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "custom-header"],
  })
);

app.use("/api", router);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
