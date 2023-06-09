const express = require("express");
const app = express();
const path = require("path");
const connectToMongoDB = require("./database/mongoDB");
require("dotenv").config();
const methodOverride = require("method-override");

require("dotenv").config();
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.COOKIE_SECRET));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
}))

const viewRouter = require('./routes/client/viewRouter');
app.use("/", viewRouter);
const pokemonRouter = require("./routes/api/pokemonRouter");
app.use("/api/pokemon", pokemonRouter);
const userRouter = require("./routes/api/userRouter");
app.use("/api/user", userRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
    connectToMongoDB();
})