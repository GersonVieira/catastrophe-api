const express = require('express');
const app = express();
const CommunityCenterRoute = require('./routes/community-center.route.js');
const mongodbConnection = require('./db/db-connection.js')

mongodbConnection.connection();

// Middleware
app.use(express.json());

//Routes
app.use('/api/community-centers', CommunityCenterRoute);

module.exports = app.listen(3000, () => {
    console.log('Server running on port 3000');
});

