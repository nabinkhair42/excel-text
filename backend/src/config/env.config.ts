import { config } from 'dotenv';
import { envSchema } from '../zod/env.zod';
import path from 'path';

// Load .env file
config({
  path: path.resolve(process.cwd(), '.env')
});

// Parse environment variables using Zod
const ENV = envSchema.safeParse(process.env);

if (!ENV.success) {
  console.error("❌ Invalid ENV Variables:", ENV.error.format());
  process.exit(1); // Stop execution if env variables are incorrect
}

export default ENV.data;