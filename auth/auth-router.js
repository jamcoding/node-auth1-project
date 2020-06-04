const router = require('express').Router();
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let newUser = req.body;

    Users.add(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not add new user.' });
        })
});

module.exports = router;