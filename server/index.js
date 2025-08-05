import express, { json, urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import secretsRoutes from "./routes/secrets.routes.js";
import authMiddleware from "./routes/auth.middleware.js";
import { ServerConfig } from "./config/server.config.js";
import { logger } from "./utils/logger.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

// Helpers to use __dirname with ES Modules
const filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(filename);


// Config
const port = ServerConfig.port;
const host = ServerConfig.host;

// Create
const app = express();

// Middlewares
app.use(cors(ServerConfig.cors));
app.use(json({ limit: '1mb' }));
app.use(cookieParser());
app.use(urlencoded({ limit: '1mb', extended: true }));

// Public
app.use(express.static(path.join(dirname, 'public')));
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(dirname, 'public', 'index.html'));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/secrets', authMiddleware, secretsRoutes);

// Start
app.listen(port, () => {
    logger(`Server is running at http://${host}:${port}`);
});
