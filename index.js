const express = require('express');
const app = express();
const mongoose = require('mongoose');
const CommunityCenterRoute = require('./routes/community-center.route.js')

// Middleware
app.use(express.json());

//Routes
app.use('/api/community-centers', CommunityCenterRoute)

app.get('/', function (req, res) {
    res.send('Hello Bro')
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

mongoose.connect('mongodb+srv://admin:catastropheapi123@catastrophe-api.jdduo.mongodb.net/?retryWrites=true&w=majority&appName=catastrophe-api')
    .then(() => {
        console.log('DB Connected');
    })
    .catch(() => {
        console.log('DB connection failed');
    }
    );