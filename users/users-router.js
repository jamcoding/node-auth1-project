const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.status(500).json({ message: "Trouble getting user." })
        })
});

module.exports = router;