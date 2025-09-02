import express from 'express';
import cors from "cors";
import { errorMiddleware } from "../../../packages/error-handler/src";
import cookieParser from 'cookie-parser';
import router from './routes/auth-router';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from "./swagger";



//const host = process.env.HOST ?? '0.0.0.0';
//const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
  })
);

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API'});
});
//swagger docs api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", router);


app.use(errorMiddleware);

const port = process.env.PORT || 6001;
const server = app.listen(port, () => {
  console.log(`Auth Service is Running At http://localhost:${port}/api`);
});

server.on("error", (err) => {
  console.log("Server Error:", err);
});
