const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing. Create backend/.env or project-root .env and set MONGODB_URI to your MongoDB Atlas connection string."
    );
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = connectDB;
