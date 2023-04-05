const express = require("express");
const app = express();
const path = require("path");
const connectToMongoDB = require("./database/mongoDB");
require("dotenv").config();
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname), "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

const viewRouter = require('./routes/viewRouter');
app.use("/", viewRouter);
const pokemonRouter = require("./routes/pokemonRouter");
app.use("/api/pokemon", pokemonRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
    connectToMongoDB();
})