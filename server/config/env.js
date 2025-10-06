import { config } from "dotenv";

// var process = NodeJS.Process

config({ path: ".env" });

export const { PORT, MONGODB_URI } = process.env;
