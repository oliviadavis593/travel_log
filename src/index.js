require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');



const middlewares = require('./middleware');
const logs = require('./api/logs');

const app = express();


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, world!'
    })
})

//put before not found handler so it can be registered
//and using it after all of our middlewares
//when a request come through to /api/logs it'll go into the logs router & see if any of the routes match
app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
