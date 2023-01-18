const { default: mongoose } = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
	try {
		mongoose.set("strictQuery", true);
		const conobj = await mongoose.connect(process.env.MONGO_URL);
		mongoose.set("strictQuery", true);
		console.log(`MONGOOSE DB connected :${conobj.connection.host}`.cyan);
	} catch (error) {
		console.log(`${error}`.bgRed);
		//cant connect then exit whole app
		process.exit(1);
	}
};

module.exports = { connectDB };
