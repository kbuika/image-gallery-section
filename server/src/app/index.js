require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser")

// const corsOptions = require('../config/corsOptions');
const checkOrigins = require('../middleware/checkOrigins');
const allRoutes = require('../v1/routes/allRoutes');

// body parser configuration
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(checkOrigins);

// Cross Origin Resource Sharing
app.use(cors({ origin: "*" }));


// middleware for json 
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Hello from the server side...")
})

// health check end point
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'API is healthy',
      })
});

// Function to serve all static files
// inside images directory.
app.use('/public/images', express.static('images'));

//Api access end points
app.use('/api/v1/kisi-test', allRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT} ...`));

module.exports = app;
