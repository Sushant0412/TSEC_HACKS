import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import cors from 'cors';

//import userRoutes from "./routes/user-routes";
import prisonerRoutes from "./routes/under-trail-prisoner-routes.js";
import judgeRoutes from "./routes/judge-routes.js";
import lawyerRoutes from "./routes/lawyer-routes.js";
import faceRecognitionRoutes from "./routes/faceRecognition-routes.js";
import userRoutes from "./routes/user-routes.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(bodyParser.json()); // req.body
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Use the routers
//app.use("/user", userRoutes);
app.use("/judge", judgeRoutes);
app.use("/lawyer", lawyerRoutes);
app.use("/prisoner", prisonerRoutes);
app.use("/face", faceRecognitionRoutes)
app.use("/user", userRoutes)

app.listen(PORT, () => {
  console.log("listening on port 3000");
});