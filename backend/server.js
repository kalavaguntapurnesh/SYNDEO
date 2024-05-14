import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { UserRouter } from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { doctorRouter } from "./routes/doctorRoutes.js";

dotenv.config();

//mongodb connection
connectDB();
console.log("Conncected to mongodb. Now going to middlewares...");

const app = express();

//This are Middlewares.

app.use(express.json());
app.use(cors());
// app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(
  cors({
    origin: "https://syndeo-frontend.vercel.app/",
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", UserRouter);
app.use("/auth", adminRouter);
app.use("/auth", doctorRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
