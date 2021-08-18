const User = require('../models/user.model');
const router = require('express').Router();

router.route('/').post((req, res) => {
  const newUser = new User({ auth0Id: req.user.sub, ...req.body });
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error! ' + err));
});

router.route('/').get((req, res) => {
  User.find({ auth0Id: req.user.sub })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error! ' + err));
});

// router.route('/delete/:id').delete();

router.route('/').patch((req, res) => {
  const updates = req.body;

  User.findOneAndUpdate({ auth0Id: req.user.sub }, updates, {
    new: true,
    upsert: true,
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json('Error! ' + err));
});

module.exports = router;
