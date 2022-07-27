const router = require('express').Router();
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');
const { movieDataValidation, movieParamsValidation } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', movieDataValidation, addMovie);
router.delete('/:_id', movieParamsValidation, removeMovie);

module.exports = router;
