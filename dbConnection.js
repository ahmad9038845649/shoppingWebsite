const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!".bgGreen);
    
    return connection;
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    throw error;
  }
};

module.exports = connectToDatabase;
