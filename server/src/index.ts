import express, { urlencoded, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import checkDatabaseConnection from "./db/connection";
import { PrismaClient, RoleName } from "@prisma/client";
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import profileRoute from "./routes/profile";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/profile", profileRoute);

app.get("/", (req, res) => {
  res.send("EcoSync Server is Up...");
});

app.listen(PORT, async () => {
  await checkDatabaseConnection();
  console.log(`Server is running on PORT ${PORT}`);
});
