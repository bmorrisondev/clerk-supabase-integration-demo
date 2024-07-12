import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

// Initialize the neon client with the DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const sql = neon(process.env.DATABASE_URL);