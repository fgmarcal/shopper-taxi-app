import express from "express";
import {customerRoutes} from "./routes/customer/CustomerRoutes";

const app = express();

app.use(customerRoutes);

export {app}