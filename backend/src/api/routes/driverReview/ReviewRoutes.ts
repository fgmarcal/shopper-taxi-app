import express from 'express';
import asyncify from "express-asyncify"; 
import { DriverReviewController } from '../../controller/driverReview/DriverReviewController';

const reviewRoutes = asyncify(express.Router());

const reviewController = new DriverReviewController();

reviewRoutes
    .route("/reviews")
    .get(reviewController.getAllReviews);

reviewRoutes
    .route("/reviews/:id")
    .get(reviewController.getAllDriverReviews);

reviewRoutes
    .route("/reviews/create")
    .post(reviewController.createReview);

export {reviewRoutes}