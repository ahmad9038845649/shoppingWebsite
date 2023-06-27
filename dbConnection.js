const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(async () => {
    console.log("Connected!".bgGreen);
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });
