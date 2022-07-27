require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/index');
const { limiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler, joiErrors } = require('./utils/errorsHandlers');
const { allowedCors } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/moviesdb'); // вынести

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use(joiErrors);
app.use(errorsHandler);

app.listen(PORT);
