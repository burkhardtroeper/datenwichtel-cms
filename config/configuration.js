module.exports = {
    mongoDbUrl: 'mongodb://172.19.0.2:27017/mscms',
    PORT: process.env.PORT || 3001,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        next();
    }
}