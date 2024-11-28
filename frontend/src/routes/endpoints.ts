export const endpoints = {
    host:'http://0.0.0.0:8080/',
}

export const customerRoutes = {
    create:endpoints.host+'customer/create',
    get:endpoints.host+'customer/'
}

export const driverRoutes = {
    create:endpoints.host+'driver/create',
    get:endpoints.host+'driver/',
    getAll:endpoints.host+'drivers',
    edit:endpoints.host+'driver/'
}

export const reviewsRoutes = {
    create:endpoints.host+'reviews/create',
    getAll:endpoints.host+'reviews'
}

export const rideRoutes = {
    estimate:endpoints.host+'ride/estimate',
    confirm:endpoints.host+'ride/confirm',
    getByCustomer:endpoints.host+'ride/'
}