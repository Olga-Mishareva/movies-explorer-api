const router = require('express').Router();
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const { auth } = require('../middlewares/auth');
const { notFound } = require('../utils/errorsHandlers');
const { registerValidation, loginValidation } = require('../utils/validation');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/users', auth, usersRoute);
router.use('/movies', auth, moviesRoute);

router.post('/signout', auth, logout);

router.use(auth, notFound);

module.exports = router;
