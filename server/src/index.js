// import { Api, TelegramClient } from "telegram";
// import  StringSession  from "telegram/sessions";
// import input from "input"; // npm i input
// const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE5MQG7BSu+gB55eUVWq9iskVMaKlnriqvWOZVU/M5gL1UAfEOMM3LYEw5yeguaJ/qNBGZdGUomi3AfFxMM5+3HeWFEZLJ1SyHS88AAhOwcarEhzSY1eeslLhWcSmMYuxykdI/3ELeEhez7mGTnpaL7dKyfAFo3C5/wZAL7hdr6BZEK63WdOF0mk1mX+DohOQ4MJCeSDOo+bw8+bAxz8BS4hX4qGFAWwXOCXRKPI/kceBphRYRBa1fS5md97a2ETPiBbyA0f1dSxQVVJZ3DrerecUsM1mCuzrVRPjaQ3gbzezQGv8UN0VFh6vnveNqwWOEF1cMjYJ4vT9ZM9IVV2z2OLZxCEQ=="); // fill this later with the value from session.save()

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/mongodb");
const messageRoutes = require("./routes/messageRoutes");
const messageListenerRoutes = require("./routes/messageListenerRoutes");
const {
  startMessageListenerFn,
} = require("./controllers/messageListenerController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Message routes
app.use("/api/messages", messageRoutes);

// Message listener routes
app.use("/api/message-listener", messageListenerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/wtfai";

// Connect to MongoDB
// Start the server after successful database connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  connectDB(MONGODB_URI).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
  startMessageListenerFn();
});
