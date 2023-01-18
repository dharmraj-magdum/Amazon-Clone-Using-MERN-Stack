//acts like our own exception handler
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	res.status(statusCode).json({
		message: err.message,
		details: process.env.MODE === "developement" ? err.stack : null,
	});
};
// details: err.stack,

module.exports = { errorHandler };
