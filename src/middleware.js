//Not found middleware
//other routes may need diff. status codes for the error presented
//we don't want each error to have a 404 code
//so this is intended for only 404 route errors 
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//general error handler 
// for any error that isn't that needs a status code that isn't 404 
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    req.status(statusCode);
    res.json({
        message: error.message, 
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    })
}

module.exports = {
    notFound, 
    errorHandler,
};