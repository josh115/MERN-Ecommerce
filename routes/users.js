const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });
  });

  const newUser = new User({
    firstname,
    lastname,
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  email: user.email,
                  firstname: user.firstname,
                  lastname: user.lastname
                }
              });
            }
          );
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });
  });
});

router.route('/auth').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: 'Invalid credentials' });

        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
              }
            });
          }
        );
      });
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/authuser').get(auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});
module.exports = router;
