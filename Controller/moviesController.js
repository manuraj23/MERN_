const Movie = require('./../Models/movieModel');
// Handlers

// exports.validateBody = (req, res, next) => {
//     if (!req.body.name || !req.body.releaseYear || !req.body.duration) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name, year, or length'
//         });
//     }
//     next();
// };
exports.getMoviesHandler = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }

}

exports.getMovieByIdHandler = async (req, res) => {
    // const movie = await Movie.find({ _id: req.params.id });
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }

}

exports.createMovieHandler = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                movie
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }

};

exports.updateMovieHandler = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,       // Extract id from req.params
            req.body,            // The updated data
            { new: true, runValidators: true } // Return updated document and validate inputs
        );

        if (!updatedMovie) {
            return res.status(404).json({
                status: 'fail',
                message: 'No movie found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                movie: updatedMovie
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteMovieHandler =async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


