const mongoose = require("mongoose");
require("dotenv").config();

function connectToMongoDB(){
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log(`MONGODB CONNECTED`)
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = connectToMongoDB