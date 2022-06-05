const mongoose = require("mongoose");

let configFile = process.env.NODE_ENV + ".env";
require("dotenv").config({ path: configFile });

var mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT;

const dbConnection = async () => {
  try {
    console.log("db" + mongoUri);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada con éxito");
  } catch (error) {
    console.error(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
