require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { serverPort } = require("./src/configs/environment");
const masterRouter = require("./src/routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());

app.use(masterRouter);

app.listen(serverPort, () => {
  console.log("App listening to port : " + serverPort);
});

module.exports = app;
