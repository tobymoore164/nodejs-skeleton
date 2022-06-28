const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
        // Make sure body is the correct schema
        const {error} = validate(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        // Check if user already exists
        const user = await User.findOne({email: req.body.email});
        if (user) return res.status(409).send({message: 'User with given email already exists'});

        // Generate a password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create the new user
        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: 'User created successfully'});
    } catch (error) {
        console.log(error);
        // 500 on error
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
});

router.get('/test', (req, res) => {
    res.send('working');
});

router.get(514)

module.exports = router;