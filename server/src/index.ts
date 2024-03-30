import express, { urlencoded, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import checkDatabaseConnection from "./db/connection";
import { PrismaClient } from "@prisma/client";
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import profileRoute from "./routes/profile";
import rbacRoute from "./routes/rbac";
import vehicleRoute from "./routes/vehicles";
import stsRoute from "./routes/sts";
import landfillRoute from "./routes/landfills";
import landfillEntryRoute from "./routes/landfillVehicle";
import stsEntryRoute from "./routes/stsVehicle";
import billRoute from "./routes/bills";
import tripRoute from "./routes/trip";
import scheduleRoute from "./routes/schedule";
import cors from "cors";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/profile", profileRoute);
app.use("/rbac", rbacRoute);
app.use("/vehicles", vehicleRoute);
app.use("/sts", stsRoute);
app.use("/landfills", landfillRoute);
app.use("/landfill-entry", landfillEntryRoute);
app.use("/sts-entry", stsEntryRoute);
app.use("/bills", billRoute);
app.use("/trips", tripRoute);
app.use("/schedules", scheduleRoute);

app.get("/", (req, res) => {
  res.send("EcoSync Server is Up...");
});

app.listen(PORT, async () => {
  await checkDatabaseConnection();
  console.log(`EcoSync Server is running on PORT ${PORT}`);
});
