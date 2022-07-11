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

router.get('/hides-by-user', async (req, res) => {
    try {
        // return if no request body
        if (req.body === undefined) return res.status(400).send({message: 'Internal Server Error'});

        // get hides by uid
        const hides = await Hide.find({"uid": req.body.uid});

        res.status(201).send({data: hides});
    } catch (error) {
        console.log(error);
        // 500 on error
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
})

module.exports = router;