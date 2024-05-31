const express = require('express');
const router = express.Router();
const {Comment} = require('../models');

router.get('/', function (req, res) {
    Comment.findAll().then((comments) => {
        res.status(200).send(comments);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

router.get('/:id', function (req, res) {
    Comment.findAll({
        where: {id: req.params.id}
    }).then((comments) => {
        res.status(200).send(comments);
    }).catch((err) => {
        res.status(404).send(err);
    });
});

router.post('/', function (req, res) {
    Comment.create(req.body).then((comment) => {
        res.status(200).send(comment);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
});

router.put('/:id', function (req, res) {
    Comment.update(
        {
            content: req.body.content,
        },
        {
            where:{
                id: req.params.id,
            },
        },
    ).then((result) => {
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(404).send(err);
    });
});

router.delete('/:id', function (req, res) {
    Comment.destroy(
        {
            where:{
                id: req.params.id,
            }
        }
    ).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

module.exports = router;