const mongoose = require('mongoose');

// Movie schema
const movieSchema1 = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Movie name is required'],
        unique: true,
        trim : true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    rating: {
        type: Number
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Release date is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genre: {
        type: [String],
        required: [true, 'Genre is required']
    },
    directors: {
        type: [String],
        required: [true, 'Director is required']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is required']
    },
    actors: {
        type: [String],
        required: [true, 'Actor is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
});

// Movie model
const Movie = mongoose.model('Movie', movieSchema1);

module.exports = Movie;

// // Create test movie
// const testMovies = new Movie({
//     name: 'Avengers',
//     description: 'First Avenger movie by Marvel',
//     duration: 170,
//     rating: 9.1
// });

// testMovies.save()
//     .then((doc) => {
//         console.log('Movie saved successfully:', doc);
//     })
//     .catch((err) => {
//         console.log('Error occurred while saving movie:', err.message);
//     });