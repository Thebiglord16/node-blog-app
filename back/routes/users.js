const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({firstName, lastName, email, password:hashed});
        res.status(201).send(user);
    }catch(err){
        if(err.message === "Validation error"){
            res.status(400).send("An user with that email already exists");
        } else {
            res.status(500).send("Registration failed");
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email:email}});
        if(!user) return res.status(401).send("Wrong username or password");
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({userId: user.id},process.env.JWT_SECRET,{expiresIn: '1h'});
            res.status(200).send({token: token});
        } else{
            res.status(401).send("Wrong username or password");
        }
    } catch(err){
        console.log(err);
        res.status(500).send("An error occured and we where unable to log you in");
    }
});

router.get('/:id', (req, res) => {
    try {
        User.findByPk(req.params.id).then((user) => {
            res.status(200).send({name:user.firstName, lastName:user.lastName});
        })
    } catch(err){
        console.log(err);
        res.status(500).send("Unable");
    }
});

module.exports = router;