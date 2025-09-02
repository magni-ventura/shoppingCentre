//import { info } from "console";
//import { version } from "os";
//import { title } from "process";
import swaggerAutogen from "swagger-autogen";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';


const doc = {
  info : {
    title: "Auth Aervice API",
    description : "Automatically generated swagger docs",
    version : "1.0.0"
  },
  host : "localhost:6001",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/auth-router.ts"]

swaggerAutogen()(outputFile, endpointsFiles, doc);
