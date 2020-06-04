const router = require('express').Router();
const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    let newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    Users.add(newUser)
        .then(user => {
            res.status(201).json(newUser);
        })
        .catch(error => {
            res.status(500).json({ message: 'User already exists.' });
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({username}).first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${username}!` })
            } else {
                res.status(401).json({ message: 'invalid creds' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.send('You cant log out for some reason')
            } else {
                res.send('goodbye.')
            }
        })
    } else {
        res.end();
    }
})

module.exports = router;