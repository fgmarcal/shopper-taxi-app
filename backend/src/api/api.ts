import express from "express";
import {customerRoutes} from "./routes/customer/CustomerRoutes";

import { driverRoutes } from "./routes/driver/DriverRoutes";
import { reviewRoutes } from "./routes/driverReview/ReviewRoutes";
import { errorHandler } from "../application/middleware/ErrorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(customerRoutes);
app.use(driverRoutes);
app.use(reviewRoutes);


app.use(errorHandler);

export {app}