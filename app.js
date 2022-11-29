require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const errorsHandling = require('./middlewaves/errorsHandling');
const { requestLogger, errorLogger } = require('./middlewaves/logger');
const cors = require('./middlewaves/cors');
const limiter = require('./middlewaves/limiter');
const { dbPath } = require('./utills/utills');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(dbPath);

app.use(requestLogger);

app.use(limiter);
app.use(helmet());
app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandling);

app.listen(PORT);
