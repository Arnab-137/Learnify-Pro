const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Study Tracker backend running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
