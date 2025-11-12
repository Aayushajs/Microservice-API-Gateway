import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import morgan from 'morgan';

dotenv.config();

const app: Application = express();

// trust proxy (important in production behind load balancers)
app.set('trust proxy', true);

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: " API Gateway is running smoothly!" });
});

// proxy
app.use(
  "/userservices",
  createProxyMiddleware(({
    target: process.env.USER_SERVICE_URL || "http://localhost:4001",
    changeOrigin: true,
    proxyTimeout: 30000,
    timeout: 30000,
    pathRewrite: { "^/userservices": "" },
  } as any))
);


app.use(
  "/order",
  createProxyMiddleware(({
    target: process.env.ORDER_SERVICE_URL || "http://localhost:4002",
    changeOrigin: true,
    pathRewrite: { "^/order": "" },
  } as any))
);  


export default app;


