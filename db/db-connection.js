const mongoose = require('mongoose');
require('dotenv').config();

const connection = () => {
    mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@catastrophe-api.jdduo.mongodb.net/?retryWrites=true&w=majority&appName=catastrophe-api`)
    .then(() => {
        console.log('DB Connected');
    })
    .catch(() => {
        console.log('DB connection failed');
    }
    );
}

module.exports = {connection}