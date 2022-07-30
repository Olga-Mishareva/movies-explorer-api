require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { NODE_ENV, MONGO_URL } = process.env;
const router = require('./routes/index');
const { limiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler, joiErrors } = require('./utils/errorsHandlers');
const { allowedCors } = require('./utils/constants');
const { DEV_MONGO_URL } = require('./utils/config');

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : DEV_MONGO_URL);

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(router);

app.use(errorLogger);
app.use(joiErrors);
app.use(errorsHandler);

app.listen(PORT);
