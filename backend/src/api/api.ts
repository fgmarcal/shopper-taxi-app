import express from "express";
import {customerRoutes} from "./routes/customer/CustomerRoutes";
import { errorHandler } from "../middleware/ErrorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded())


app.use(customerRoutes);


app.use(errorHandler);

export {app}