const express = require('express');
const router = express.Router();
const {Post} = require('../models');

router.get('/', function (req, res) {
    Post.findAll().then((posts) => {
        res.status(200).send(posts);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

router.get('/:id', function (req, res) {
    Post.findAll({
        where: {id: req.params.id}
    }).then((posts) => {
        res.status(200).send(posts);
    }).catch((err) => {
        res.status(404).send(err);
    });
});

router.post('/', function (req, res) {
    Post.create(req.body).then((post) => {
        res.status(200).send(post);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
});

router.put('/:id', function (req, res) {
    Post.update(
        {
            title: req.body.title,
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
    Post.destroy(
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