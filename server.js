



const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

const app = require('./10.Creating_Route_Modules');

// Check environment
console.log(app.get('env'));
console.log(process.env);


//for local connection
// mongoose.connect(process.env.LOCAL_CONN_STR, {
//     useNewUrlParser: true
// }).then((conn) => {
//     // console.log(conn);
//     console.log('DB connection successful!')
// }); 

// MongoDB connection
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful!');
}).catch((err) => {
    console.log('Error connecting to DB:', err.message);
});

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

// Create test movie
const testMovies = new Movie({
    name: 'Avengers',
    description: 'First Avenger movie by Marvel',
    duration: 170,
    rating: 9.1
});

testMovies.save()
    .then((doc) => {
        console.log('Movie saved successfully:', doc);
    })
    .catch((err) => {
        console.log('Error occurred while saving movie:', err.message);
    });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
