const mongoose = require('mongoose');
const Family = require('../models/family.model');
const User = require('../models/user.model');
const router = require('express').Router();

router.route('/').post((req, res) => {
  const head = mongoose.Types.ObjectId(req.body.head);
  const newFamily = new Family({ ...req.body, head, members: [head] });
  newFamily
    .save()
    .then((family) => res.json(family))
    .catch((err) => res.status(400).json('Error! ' + err));
});

router.route('/:id').get((req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id);
  Family.find({ members: userId }).then((families) => res.json(families));
});

module.exports = router;
