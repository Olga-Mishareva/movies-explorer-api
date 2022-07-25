require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

const usersRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');
// const auth = require('./middlewares/auth');

const { limiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler, notFound } = require('./utils/errorsHandler');

mongoose.connect('mongodb://localhost:27017/filmdb');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

// app.use(cors({
//   origin: allowedCors,
//   credentials: true,
// }));

app.use(limiter);

// app.post('/signin', loginValidation, login);
// app.post('/signup', registerValidation, createUser);

app.use('/users', usersRoute);
app.use('/movies', moviesRoute);
// app.use('/users', auth, usersRoute);
// app.use('/cards', auth, cardsRoute);

// app.post('/signout', auth, logout);

app.use(notFound);

app.use(errorLogger);

// app.use(joiErrors);

app.use(errorsHandler);

app.listen(PORT);
