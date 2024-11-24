import express from "express";
import cors from 'cors';

import {customerRoutes} from "./routes/customer/CustomerRoutes";

import { driverRoutes } from "./routes/driver/DriverRoutes";
import { reviewRoutes } from "./routes/driverReview/ReviewRoutes";
import { errorHandler } from "../application/middleware/ErrorHandler";
import { rideRoutes } from "./routes/ride/RideRoutes";

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};


const app = express();

app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(customerRoutes);
app.use(driverRoutes);
app.use(reviewRoutes);
app.use(rideRoutes);


app.use(errorHandler);

export {app}