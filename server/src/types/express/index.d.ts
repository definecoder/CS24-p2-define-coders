import { Server } from "socket.io";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../custom";

// to make the file a module and avoid the TypeScript error

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
    io?: Server;
  }
}
