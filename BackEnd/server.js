const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs"); // Import the File System module

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

// Middleware to parse JSON requests
app.use(express.json());

// Sequelize configuration
const sequelize = new Sequelize("cloneOLX", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

async function createDatabase() {
  try {
    await sequelize.query("CREATE DATABASE IF NOT EXISTS cloneOLX");
    console.log("Database created successfully.");
  } catch (error) {
    console.error("Error creating database:", error);
  }
}

// Start the server
app.listen(port, () => {
  const message = `Server running at http://${hostname}:${port}/`;
  console.log(message);
});
