const Pokemon = require("../../models/pokemonModel");

async function getAllPokemon(req, res) {
    try {
        let results = await Pokemon.find({})

        res.json({
            message: "success",
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: "get all pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function getOnePokemon(req, res) {
    try {
        let results = await Pokemon.findOne({Name: req.params.name})
        res.json({
            message: "success",
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: "get one pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function createOnePokemon(req, res) {
    try {
        // Accepting the front-end form data from the client to generate the document
        let newPokemon = {
            PokedexNo: req.body.PokedexNo,
            Name: req.body.Name,
            Type: req.body.Type,
            Moves: req.body.Moves.split(", "),
        }

        // post the new document to the Pokemon collection
        await Pokemon.create(newPokemon);

        // don't want client to see json
        // res.json({
        //     message: "success",
        //     payload: newPokemon
        // })

        res.redirect(`/oneMon/${newPokemon.Name}`)
    } catch (error) {
        let errorObj = {
            message: "create one pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function deleteOnePokemon(req, res) {
    try {
        await Pokemon.deleteOne({ Name: req.params.name })

        // res.json({
        //     message: "success",
        //     payload: req.params.name
        // })

        res.redirect("/allMons");
    } catch (error) {
        let errorObj = {
            message: "delete one pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function updateOnePokemon(req, res) {
    try {
        let updatedPokemon = {
            PokedexNo: req.body.PokedexNo,
            Name: req.body.Name,
            Type: req.body.Type,
            Moves: req.body.Moves.split(", "),
        }

        await Pokemon.updateOne(
            { Name: req.params.name},
            { $set: updatedPokemon },
            { upsert: true }
        )

        // res.json({
        //     message: "success",
        //     payload: updatedPokemon
        // });

        res.redirect(`/oneMon/${updatedPokemon.Name}`);
    } catch (error) {
        let errorObj = {
            message: "update one pokemon failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}


module.exports = {
    getAllPokemon,
    getOnePokemon,
    createOnePokemon,
    deleteOnePokemon,
    updateOnePokemon
}