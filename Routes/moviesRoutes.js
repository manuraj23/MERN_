const express = require('express');
const movieController = require('../Controller/moviesController'); // Adjust path if necessary

const router = express.Router();
router.param('id', (req, res, next, val) => {
    console.log(`Movie id is: ${val}`);
    next();
});


router.route('/')
    .get(movieController.getMoviesHandler)
    .post(movieController.validateBody,movieController.createMovieHandler);

router.route('/:id')
    .get(movieController.getMovieByIdHandler)
    .patch(movieController.updateMovieHandler)
    .delete(movieController.deleteMovieHandler);

module.exports = router;
