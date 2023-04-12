const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    try {
        let { username, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(password, salt);
        let newUserObj = {
            username: username,
            password: encryptedPassword,
            favoritePokemon: []
        }
        await User.create(newUserObj);
        res.redirect("/logIn");
    } catch (error) {
        let errorObj = {
            message: "create user failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function logInUser(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if(!user){
            throw "User not found, please sign up";
        } else {
            let comparedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!comparedPassword) {
                throw "Please check your password and try again"
            } else {
                req.session.isAuth = true;
                let userObj = {
                    username: user.username,
                    id: user._id
                }
                req.session.user = userObj;
                res.redirect("/user");
            }
        }
        
    } catch (error) {
        let errorObj = {
            message: "logIn user failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function addFavoritePokemonToUser(req, res) {
    try {
        let userId = req.session.user.id
        let currentUser = await User.findById({ _id: userId });
        currentUser.favoritePokemon.push(req.body.pokeId);

        let newUserObj = {
            favoritePokemon: currentUser.favoritePokemon
        }

        await User.updateOne(
            { _id: userId },
            { $set: newUserObj },
            { upsert: true }
        )

        res.redirect("/user");
    } catch (error) {
        console.log(`addFavoritePokemonToUser error: ${error}`);
    }
}

module.exports = {
    createUser,
    logInUser,
    addFavoritePokemonToUser
}