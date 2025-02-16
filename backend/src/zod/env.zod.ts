import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  FRONTEND_URL: z.string().url(),
  PRODUCTION_FRONTEND_URL: z.string().url(),
});

export { envSchema };
