const router = require('express').Router();
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', addMovie);
router.delete('/:_id', removeMovie);

module.exports = router;
