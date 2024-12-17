const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;


// const testMovies = new Movie({
//     name: 'Avengers Endgame',
//     description: 'A wonder full movie by Marvel',
//     duration: 180,
//     rating: 9.8
// });

// testMovies.save()
//     .then((doc) => {
//         console.log(doc);
//     })
//     .catch((err) => {
//         console.log("Error occured: " + err);
//     });