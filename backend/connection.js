const mongoose = require('mongoose');

async function connectToMongoDB(URL) {
  try {
    await mongoose.connect(URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


module.exports = connectToMongoDB;
