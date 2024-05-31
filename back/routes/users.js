const express = require('express');
const router = express.Router();
const { User} = require('../models');

router.get('/:id', function (req, res) {
    User.findAll({
        where: {id: req.params.id}
    }).then((user) => {
        if(user.length > 0){
            res.status(200).send(user);
        } else {
            res.status(404).send('Not Found');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.post('/', function (req, res) {
    try {
        res.status(201).send(User.create(req.body));
    }catch(err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;