const express = require('express');

const router = express.Router();
const User = require('../models/User.js');

router.get('/', (req, res, next) => {
  User.find({})
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

module.exports = router;
