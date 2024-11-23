import express from 'express';
import asyncify from "express-asyncify"; 
import { RideController } from '../../controller/ride/RideController';

const rideRoutes = asyncify(express.Router());

const rideController = new RideController();

rideRoutes
    .route("/ride/estimate")
    .post(rideController.estimateRide);

rideRoutes
    .route("/ride/confirm")
    .patch(rideController.confirmRide);

rideRoutes
    .route("/ride/:customer_id")
    .get(rideController.getRides);

export{rideRoutes}