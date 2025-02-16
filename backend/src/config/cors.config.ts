import { CorsOptions } from "cors";
import ENV from "./env.config";

const corsOptions: CorsOptions = {
  origin: ENV.NODE_ENV === 'production' 
    ? ENV.PRODUCTION_FRONTEND_URL 
    : ENV.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};

export default corsOptions;