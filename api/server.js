const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter); 
server.use('/api/auth', authRouter); 

server.use('/', (req, res) => {
    res.send('<h2>Node Auth Project 1<h2>');
});

module.exports = server;