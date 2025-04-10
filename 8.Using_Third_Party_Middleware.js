// We are going to use Morgon which is very popular logging middleware and it allows us to see request data by writing it in the console.

const express = require('express');
const fs = require('fs');

const morgan=require('morgan');

let app = express();

// Middleware to parse JSON request body
app.use(express.json());

app.use(morgan('dev')); //This is used to log the request data in the console.





//Creating own custom middleware
const logger=function(req,res,next){
    console.log('Hello from the middleware');
    next(); //This is used to move to the next middleware
}
app.use(logger);
app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString();
    next();
});

// Load movies from JSON file
let movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));

function getMoviesHandler(req, res) {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    });
}

function getMovieByIdHandler(req, res) {
    const id = req.params.id * 1; // Convert string to number
    let movie = movies.find(el => el.id === id);

    if (!movie) {
        return res.status(404).json({
            status: 'fail',
            message: 'Movie with id ' + id + ' not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie: movie
        }
    });
}

function createMovieHandler(req, res) {
    const newId = movies[movies.length - 1]?.id + 1 || 1; // Handle empty array case
    const newMovie = Object.assign({ id: newId }, req.body); // Merge new ID with request body
    movies.push(newMovie);

    fs.writeFile('data/movies.json', JSON.stringify(movies), err => { // Convert movies array to a string
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Error writing to file'
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                movies: newMovie
            }
        });
    });
}

function updateMovieHandler(req, res) {
    const id = req.params.id * 1; // Convert id to a number
    const movieToUpdate = movies.find(el => el.id === id);
    const index = movies.findIndex(el => el.id === id);

    if (!movieToUpdate) {
        return res.status(404).json({
            status: 'fail',
            message: 'Movie with id ' + id + ' not found'
        });
    }

    // Update the movie object with new data
    Object.assign(movieToUpdate, req.body);
    movies[index] = movieToUpdate;

    // Save the updated movies array to the file
    fs.writeFile('data/movies.json', JSON.stringify(movies), err => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Error writing to file'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                movie: movieToUpdate
            }
        });
    });
}

function deleteMovieHandler(req, res) {
    const id = req.params.id * 1; // Convert id to a number
    const movieToDelete = movies.find(el => el.id === id);
    const index = movies.indexOf(movieToDelete);

    if (!movieToDelete) {
        return res.status(404).json({
            status: 'fail',
            message: 'Movie with id ' + id + ' not found'
        });
    }

    // Remove the movie from the array
    movies.splice(index, 1); // Delete one element at the given index

    // Save the updated movies array to the file
    fs.writeFile('data/movies.json', JSON.stringify(movies), err => {
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

// Define routes
app.route('/api/v1/movies').get(getMoviesHandler).post(createMovieHandler);
// app.use(logger); //This middleware will be applied to all the routes below not above it beacause of route middleware.
app.route('/api/v1/movies/:id').get(getMovieByIdHandler).patch(updateMovieHandler).delete(deleteMovieHandler);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
