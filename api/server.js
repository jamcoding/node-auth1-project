const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/', (req, res) => {
    res.send('<h2>Node Auth Project 1<h2>');
});

module.exports = server;