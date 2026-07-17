const path = require("path");
const http = require("http");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = require("./app");
const connectDB = require("./config/db");
const initializeChatSocket = require("./services/chatSocketService");

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDB();
  const server = http.createServer(app);
  initializeChatSocket(server);
  server.listen(PORT, () => {
    console.log(`Study Tracker backend running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
