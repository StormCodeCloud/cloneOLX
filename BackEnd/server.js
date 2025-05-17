const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs"); // Import the File System module

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

// Middleware to parse JSON requests
app.use(express.json());

// Sequelize configuration
const sequelize = new Sequelize("ficha9", "root", "duarte2003", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

// Start the server
app.listen(port, () => {
  const message = `Server running at http://${hostname}:${port}/`;
  console.log(message);
});
