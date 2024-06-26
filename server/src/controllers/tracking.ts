import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";

//

const prisma = new PrismaClient();

const track = (io: Server) => {
  io.on("connection", (socket) => {
    const connectionType = socket.handshake.query.type;

    if (connectionType == "vehicle") {
      handleVehicle(socket);
    } else if (connectionType == "admin") {
      handleAdmin(socket);
    } else if (connectionType == "sts") {
      handleSts(socket);
    } else if (connectionType == "landfill") {
      handleLandfill(socket);
    } else if (connectionType == "citizen") {
      // handleCitizen(socket);
    }
  });
};

// const handleCitizen = (socket: Socket) => {

//   socket.on("join_rooms", async (data) => {
//     socket.join("notification");
//   }

// }

const handleSts = (socket: Socket) => {
  const id = socket.handshake.query.id;

  socket.on("join_rooms", async (data) => {
    if (id == undefined) {
      return;
    }
    console.log("sts", id, "has joined");

    socket.join(id);
    console.log("joined sts room");
  });
};

const handleLandfill = (socket: Socket) => {
  const id = socket.handshake.query.id;

  socket.on("join_rooms", async (data) => {
    if (id == undefined) {
      return;
    }
    console.log("landfill", id, "has joined");

    socket.join(id);
    console.log("joined landfill room");
  });
};

const handleVehicle = (socket: Socket) => {
  socket.on("join_rooms", async (data) => {
    // get vehicle id
    const id = data.vehicleId;

    console.log("vehicle", id, "has joined");

    if (!id) return;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id,
      },
      select: {
        stsId: true,
        landFillId: true,
      },
    });

    if (!vehicle) {
      return;
    }

    socket.join(vehicle.stsId);
    console.log("joined sts room");
    socket.join(vehicle.landFillId);
    console.log("joined landfill room");
    socket.join("adminsVehicles");
    console.log("joined adminsVehicles room");
  });

  socket.on("send_location", async (data) => {
    const { latitude, longitude } = data;

    socket.to(data.stsId).emit("location", {
      vehicleId: data.vehicleId,
      latitude,
      longitude,
    });

    socket.to(data.landFillId).emit("location", {
      vehicleId: data.vehicleId,
      latitude,
      longitude,
    });

    socket.to("adminsVehicles").emit("location", {
      latitude,
      longitude,
      vehicleId: data.vehicleId,
    });
  });
};

const handleAdmin = (socket: Socket) => {
  socket.on("join_rooms", async (data) => {
    console.log("admin has joined");

    socket.join("adminsVehicles");
    console.log("joined adminsVehicles room");
  });
};

export { track };
