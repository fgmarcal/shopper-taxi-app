import express from "express";
import {customerRoutes} from "./routes/customer/CustomerRoutes";
import { errorHandler } from "../middleware/ErrorHandler";
import { driverRoutes } from "./routes/driver/DriverRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(customerRoutes);
app.use(driverRoutes)


app.use(errorHandler);

export {app}