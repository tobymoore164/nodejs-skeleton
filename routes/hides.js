const router = require('express').Router();
const {Hide} = require('../models/hide');

router.post('/upload-hide', async (req, res) => {
    try {
        // Make sure body is the correct schema
        if (req.body === undefined) return res.status(400).send({message: 'Internal Server Error'});

        // Create the new hide
        await new Hide(req.body).save();
        res.status(201).send({message: 'Hide created successfully'});
    } catch (error) {
        console.log(error);
        // 500 on error
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
});

module.exports = router;