const express = require('express');
const router = express.Router();
const {Post, User} = require('../models');
const verifyToken = require('../middleware/authentication');

router.get('/',function(req, res){
    Post.findAll().then((posts) => {
        res.status(200).send(posts);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

router.get('/:id', function (req, res) {
    Post.findOne({
        where: {id: req.params.id},
        include: [{
            model: User,
            attributes: ['firstName', 'lastName']
        }]
    }).then((posts) => {
        res.status(200).send(posts);
    }).catch((err) => {
        res.status(404).send(err);
    });
});

router.post('/', verifyToken, function (req, res) {
    Post.create(req.body).then((post) => {
        res.status(200).send(post);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
});

router.put('/:id', verifyToken, function (req, res) {
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

router.delete('/:id', verifyToken, function (req, res) {
    Post.destroy(
        {
            where:{
                id: req.params.id,
            }
        }
    ).then((result) => {
        res.status(204).send();
    }).catch((err) => {
        res.status(404).send(err);
    })
});

module.exports = router;