const apiEndpointValidator = (req, res, next) => {
    let validApiEndpoint = req.params.type;

    // this middlerware will check for dynamic entered endpoints, with /:

    return next();
};

module.exports = apiEndpointValidator;
