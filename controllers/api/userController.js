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
        res.redirect("/logIn"); // client
    } catch (error) {
        let errorObj = {
            message: "create user failure",
            payload: error
        }
        console.log(errorObj); // server-side
        res.json(errorObj); // client-side
    }
}

module.exports = {
    createUser
}