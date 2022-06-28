const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log('Connected to database...');
    } catch (error) {
        console.error('Issue connecting to database... ', error);
    }
}