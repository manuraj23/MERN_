const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'}); //This should be above app variable

const app = require('./10.Creating_Route_Modules');
console.log(app.get('env'));
console.log(process.env);

//for local connection
// mongoose.connect(process.env.LOCAL_CONN_STR, {
//     useNewUrlParser: true
// }).then((conn) => {
//     // console.log(conn);
//     console.log('DB connection successful!')
// }); 

// for cloud connection
mongoose.connect(process.env.CONN_STR, {  
    useNewUrlParser:true
}).then((conn) => {
    // console.log(conn);
    console.log('DB connection successful!')
}).catch((err) => {
    console.log(err);
    console.log('Error connecting to DB');
}); 




 


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
