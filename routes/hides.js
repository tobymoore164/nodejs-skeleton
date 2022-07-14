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

router.post('/hides-by-user', async (req, res) => {
    try {
        // return if no request body
        if (req.body === undefined) return res.status(400).send({message: 'Internal Server Error'});

        // get hides by uid
        const data = await Hide.find({"uid": req.body.uid});

        const formattedHides = {};
        data.forEach((_hide, _index) => {
            if (_index === 0 || formattedHides[_hide.lotNumber] === undefined) {
                formattedHides[_hide.lotNumber] = [_hide];
            } else {
                formattedHides[_hide.lotNumber].push(_hide)
            }
        });
        /* data.forEach((_hide, _index) => {
            if (_index === 0) {
                formattedHides.push(
                    {
                        "lotNumber": _hide.lotNumber,
                        "hides": [
                            _hide
                        ]
                    }
                )
            } else {

            }
        });    */     

        res.status(201).send(formattedHides);
    } catch (error) {
        console.log(error);
        // 500 on error
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
})

module.exports = router; 