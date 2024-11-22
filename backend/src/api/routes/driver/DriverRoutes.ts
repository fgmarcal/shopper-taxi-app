import express from 'express';
import asyncify from "express-asyncify"; 
import { DriverController } from '../../controller/driver/DriverController';

const driverRoutes = asyncify(express.Router());

const driverController = new DriverController();

driverRoutes
    .route("/driver/:id")
    .get(driverController.getDriver)
    .put(driverController.updateDriver);

driverRoutes
    .route("/drivers")
    .get(driverController.getAllDrivers);

driverRoutes
    .route("/driver/create")
    .post(driverController.createDriver);

export {driverRoutes}