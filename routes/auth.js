const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    try {
        // Validate the schema.
        const {error} = validate(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({message: 'Invalid email or password'});

        // Check if password is valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) return res.status(401).send({message: 'Invalid email or password'})

        // Login, return generated JWT
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: 'Logged in successfully', user: user});
        
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
});

router.get('/user', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) return res.status(401).send({message: 'No user by email...'});
        
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    });

    return schema.validate(data);
}

module.exports = router;