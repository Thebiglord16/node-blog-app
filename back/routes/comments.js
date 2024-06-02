const express = require('express');
const router = express.Router();
const {Comment, User} = require('../models');

const hydrateComments= (comments)=>{
    comments.forEach((comment) =>{
        User.findByPk(comment.userId).then((user)=>{
            comment.username = user.firstName + user.lastName;
        });
    });
}

router.get('/', function (req, res) {
    Comment.findAll().then((comments) => {
        res.status(200).send(comments);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

router.get('/:postId', function (req, res) {
    Comment.findAll({
        where: {postId: req.params.postId},
        include:[{
            model: User,
            attributes: ['firstName', 'lastName']
        }]
    }).then((comments) => {
        hydrateComments(comments);
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