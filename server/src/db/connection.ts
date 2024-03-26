
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define an async function to check the database connection
async function checkDatabaseConnection() {
  try {
    // Execute a simple query
    const result = await prisma.$queryRaw`SELECT 1+1`;

    // Log success message if the query is successful
    console.log('Database connected successfully:', result);
  } catch (error) {
    // Handle any errors that occur
    console.error('Error connecting to the database:', error);
  } finally {
    // Disconnect Prisma Client when done
    await prisma.$disconnect();
  }
}

// export the function
export default checkDatabaseConnection;
