import { config } from "dotenv";

// var process = NodeJS.Process

config({ path: ".env" });

export const { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
