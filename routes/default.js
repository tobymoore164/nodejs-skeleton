const router = require('express').Router();

router.get('/test', async (req, res) => {
    try {
        res.status(200).send('working');
    } catch (error) {        
        // 500 on error
        res.status(500).send({message: 'Internal Server Error', error: error});
    }
});



module.exports = router; 