import express, { Express, Request, Response } from "express";
import adminRouter from "./routes/adminRoute";
import userRouter from "./routes/userRoutes";
import dotenv from "dotenv";

const app: Express = express();
const port = 3001;
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
