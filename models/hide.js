const mongoose = require('mongoose');

const hideSchema = new mongoose.Schema({
    hideId: {
        type: String,
        required: true,
    },
    lotNumber: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    defects: {
        type: Array,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
})

const Hide = mongoose.model('hide', hideSchema);

module.exports = {Hide};