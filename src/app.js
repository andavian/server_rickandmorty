const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(cors());

server.use(express.json());

/*
request --> morgan --> cors --> express.json() -> ruta ('/rickandmorty')
  req        req        req
*/

server.use("/rickandmorty", router);

module.exports = server;
