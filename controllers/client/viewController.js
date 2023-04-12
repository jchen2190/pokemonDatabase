const Pokemon = require("../../models/pokemonModel");
const User = require("../../models/userModel");

function getIndexPage(req, res) {
    res.render("index");
}

async function renderAllPokemon(req, res) {
    try {
        let result = await Pokemon.find({});
        res.render("allMons", { pokemon: result })
    } catch (error) {
        let errorObj = {
            message: "render all pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function renderOnePokemonPage(req, res) {
    try {
        let result = await Pokemon.findOne({ Name: req.params.name})

        let userFaves
        if(req.session.isAuth) {
            let currentUser = await User.findOne({username: req.session.user.username});
            userFaves = currentUser.favoritePokemon
        } else {
            userFaves = []
        }

        res.render("oneMon", { pokemon: result, loggedIn: req.session.isAuth, userFaves: userFaves})
    } catch (error) {
        let errorObj = {
            message: "render one pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function renderCreatePokemonForm(req, res) {
    try {
        res.render("createMon")
    } catch (error) {
        let errorObj = {
            message: "render create pokemon form failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function renderUpdatePokemonForm(req, res) {
    try {
        let result = await Pokemon.findOne({ Name: req.params.name })
        res.render("updateMon", {pokemon: result})
    } catch (error) {
        let errorObj = {
            message: "render update pokemon form failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function renderSignUpForm(req, res) {
    try {
        res.render("signUp");
    } catch (error) {
        console.log(`renderSignUpForm error: ${error}`);
    }
}

async function renderLogInForm(req, res) {
    try {
        res.render("logIn");
    } catch (error) {
        console.log(`renderLogInForm error: ${error}`)
    }
}

async function renderUserPage(req, res){
    try {
        if(req.session.isAuth){
            let currentUser = await User.findOne({ _id: req.session.user.id });
            let pokeNameList = []
            for(let i = 0; i < currentUser.favoritePokemon.length; i++){
                let onePokemon = await Pokemon.findOne({_id: currentUser.favoritePokemon[i]});

                pokeNameList.push(onePokemon.Name);
            }
            res.render("user", { user: currentUser, favoritePokemon: pokeNameList });
        } else {
            res.redirect("/logIn");
        }
    } catch (error) {
        console.log(`renderUserPage error: ${error}`);
    }
}
async function logOutUser(req, res) {
    try {
        res.clearCookie("connect.sid", {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: null
        })
        req.session.destroy();
        res.redirect("/logIn");
    } catch (error) {
        console.log(`logOutUser error: ${error}`);
    }
}

module.exports = {
    getIndexPage,
    renderAllPokemon,
    renderOnePokemonPage,
    renderCreatePokemonForm,
    renderUpdatePokemonForm,
    renderSignUpForm,
    renderLogInForm,
    renderUserPage,
    logOutUser
}