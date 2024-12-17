const fs = require('fs');
const Movie = require('./../Models/movieModel');
let movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));

// Handlers

exports.validateBody = (req, res, next) => {
    if (!req.body.name || !req.body.releaseYear || !req.body.duration) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name, year, or length'
        });
    }
    next();
};
exports.getMoviesHandler=(req, res) =>{
    res.status(200).json({
        status: 'success',
        count: movies.length,
        data: { movies }
    });
}

exports.getMovieByIdHandler = (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert string to number
    const movie = movies.find(el => el.id === id);

    if (!movie) {
        return res.status(404).json({
            status: 'fail',
            message: `Movie with id ${id} not found`
        });
    }

    res.status(200).json({
        status: 'success',
        data: { movie }
    });
}

exports.createMovieHandler = (req, res) => {
    const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
    const newMovie = { id: newId, ...req.body };
    movies.push(newMovie);

    const filePath = path.join(__dirname, '../data/movies.json');

    fs.writeFile(filePath, JSON.stringify(movies), err => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Error writing to file'
            });
        }
        res.status(201).json({
            status: 'success',
            data: { movie: newMovie }
        });
    });
};

exports.updateMovieHandler = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movieIndex = movies.findIndex(el => el.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Movie with id ${id} not found`
        });
    }

    Object.assign(movies[movieIndex], req.body);

    fs.writeFile(path.join(__dirname, '../data/movies.json'), JSON.stringify(movies), err => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Error writing to file'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { movie: movies[movieIndex] }
        });
    });
}

exports.deleteMovieHandler = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movieIndex = movies.findIndex(el => el.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Movie with id ${id} not found`
        });
    }

    movies.splice(movieIndex, 1);

    fs.writeFile(path.join(__dirname, '../data/movies.json'), JSON.stringify(movies), err => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Error writing to file'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}


