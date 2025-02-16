import app from '@/app';
import ENV from '@/config/env.config';

const startServer = () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${ENV.PORT}`);
      console.log(`🌍 Environment: ${ENV.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 