const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./config/db.mongo");
const initPostgres = require("./config/init.postgres");
const initMongo = require("./config/init.mongo");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api", profileRoutes);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Initialize PostgreSQL and MongoDB
    await initPostgres();
    await initMongo();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
