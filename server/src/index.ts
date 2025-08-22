import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import helmet from "helmet";
import path from "path";
import compression from "compression";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { generalLimiter } from "./middleware/limit.middleware.ts";
import routes from "./routes/index.ts";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "http://localhost:5173"],
        objectSrc: ["'none'"],
        connectSrc: ["'self'", "http://localhost:5173"],
        imgSrc: ["'self'", "'data'", "http://localhost:3500"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", generalLimiter, routes());

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://${process.env.HOST}:${PORT}`);
});
