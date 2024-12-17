const mongoose = require('mongoose');

// Movie schema
const movieSchema1 = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Movie name is required'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    rating: {
        type: Number,
        default: 1.0
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