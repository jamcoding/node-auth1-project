const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
    name: 'amsession',
    secret: 'my secret secret',
    cookie: {
        maxAge: 1000 * 60 * 60, // <-- 1 hour
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
};

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', usersRouter); 
server.use('/api/auth', authRouter); 

server.use('/', (req, res) => {
    res.send('<h2>Node Auth Project 1<h2>');
});

module.exports = server;