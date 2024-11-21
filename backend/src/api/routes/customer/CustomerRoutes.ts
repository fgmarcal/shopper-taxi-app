import express from 'express';
import asyncify from "express-asyncify"; 
import { CustomerController } from '../../controller/customer/CustomerController';

const customerRoutes = asyncify(express.Router());

const customerController = new CustomerController();

customerRoutes
    .route('/customer/:email')
    .get(customerController.getCustomer)

customerRoutes
    .route('/customer/create')
    .post(customerController.createCustomer)

export {customerRoutes};