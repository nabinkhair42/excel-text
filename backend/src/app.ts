import express, { Express } from 'express';
import cors from 'cors';
import { setupRoutes } from './routes';
import corsOptions from './config/cors.config';

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());

setupRoutes(app);

export default app;

