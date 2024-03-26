import { PrismaClient, Prisma } from "@prisma/client";

import { RoleName } from "../types/rolesTypes";

const prisma = new PrismaClient();

const hashedP = "$2b$10$glYOMtehNGf7iiKqxQruIO1MJEZAqo2NU.NgI3T2wr.hRaZOjZ96.";

const roleData: Prisma.RoleCreateInput[] = [
  {
    name: RoleName.LAND_MANAGER,
    description: "Land Manager Role",
  },
  {
    name: RoleName.SYSTEM_ADMIN,
    description: "System Admin Role",
  },
  {
    name: RoleName.STS_MANAGER,
    description: "STS Manager Role",
  },
  {
    name: RoleName.UNASSIGNED,
    description: "Unassigned Role",
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    username: "Shawon Majid",
    email: "shawon.majid@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.SYSTEM_ADMIN,
      },
    },
  },
  {
    username: "Mehrajul Islam",
    email: "codermehraj@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.LAND_MANAGER,
      },
    },
  },
  {
    username: "Mehrajul Islam 2",
    email: "codermehraj2@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.LAND_MANAGER,
      },
    },
  },

  {
    username: "Nafi Ullah",
    email: "shafinnafiullah@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.STS_MANAGER,
      },
    },
  },
  {
    username: "Nafi Ullah 2",
    email: "shafinnafiullah2@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.STS_MANAGER,
      },
    },
  },

  {
    username: "kuddus",
    email: "kuddus@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.UNASSIGNED,
      },
    },
  },
  {
    username: "kuddus 2",
    email: "kuddus2@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.UNASSIGNED,
      },
    },
  },
  {
    username: "kuddus 3",
    email: "kuddus3@gmail.com",
    hashedPassword: hashedP,
    role: {
      connect: {
        name: RoleName.UNASSIGNED,
      },
    },
  },
];

const vehicleData: Prisma.VehicleCreateInput[] = [
  {
    vehicleNumber: "13-8272",
    vehicleType: "DUMP_TRUCK",
    capacity: 4,
    loadedFuelCostPerKm: 10,
    unloadedFuelCostPerKm: 5,
  },
  {
    vehicleNumber: "13-8273",
    vehicleType: "OPEN_TRUCK",
    capacity: 2,
    loadedFuelCostPerKm: 14,
    unloadedFuelCostPerKm: 6,
  },
  {
    vehicleNumber: "13-8274",
    vehicleType: "OPEN_TRUCK",
    capacity: 1,
    loadedFuelCostPerKm: 6,
    unloadedFuelCostPerKm: 1,
  },
  {
    vehicleNumber: "13-8275",
    vehicleType: "OPEN_TRUCK",
    capacity: 2,
    loadedFuelCostPerKm: 20,
    unloadedFuelCostPerKm: 8,
  },
  {
    vehicleNumber: "13-8276",
    vehicleType: "COMPACTOR",
    capacity: 5,
    loadedFuelCostPerKm: 25,
    unloadedFuelCostPerKm: 2,
  },
  {
    vehicleNumber: "13-8277",
    vehicleType: "CONTAINER",
    capacity: 6,
    loadedFuelCostPerKm: 30,
    unloadedFuelCostPerKm: 10,
  },
  {
    vehicleNumber: "13-8278",
    vehicleType: "DUMP_TRUCK",
    capacity: 3,
    loadedFuelCostPerKm: 12,
    unloadedFuelCostPerKm: 3,
  },
];

const stsData: Prisma.STSCreateInput[] = [
  {
    name: "Moheshkhali",
    wardNumber: "13",
    capacity: 1000,
    latitude: 342.456,
    longitude: 85.91,
  },
  {
    name: "Gulshan",
    wardNumber: "2",
    capacity: 2000,
    latitude: 234.456,
    longitude: 75.912,
  },

  {
    name: "Bonani",
    wardNumber: "4",
    capacity: 1500,
    latitude: 425.456,
    longitude: 123.912,
  },
];

const landfillData: Prisma.LandfillCreateInput[] = [
  {
    name: "Amin Bazar",
    capacity: 10000,
    latitude: 23.7894892,
    longitude: 90.2669163,
  },
];

async function main() {
  console.log("Seeding roles...");
  for (const role of roleData) {
    const newRole = await prisma.role.create({
      data: role,
    });
    console.log(newRole);
  }

  console.log("Seeding users...");
  for (const user of userData) {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log(newUser);
  }

  console.log("Seeding vehicles...");
  for (const vehicle of vehicleData) {
    const newVehicle = await prisma.vehicle.create({
      data: vehicle,
    });
    console.log(newVehicle);
  }

  console.log("Seeding STS...");
  for (const sts of stsData) {
    const newSts = await prisma.sTS.create({
      data: sts,
    });
    console.log(newSts);
  }

  console.log("Seeding landfills...");
  for (const landfill of landfillData) {
    const newLandfill = await prisma.landfill.create({
      data: landfill,
    });
    console.log(newLandfill);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
