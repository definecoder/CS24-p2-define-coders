import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import checkDatabaseConnection from "./db/connection";
import routes from "./routes";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { track } from "./controllers/tracking";
import { getIPAddress } from "./services/utils";


getIPAddress();

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

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("EcoSync Server is Up...");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {});

track(io);

httpServer.listen(PORT, async () => {
  await checkDatabaseConnection();
  console.log(`EcoSync Server is running on PORT ${PORT}`);
});
