import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// postgreess
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// prisma adapter
const adapter = new PrismaPg(pool);

// global prisma client
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// create prisma client
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;