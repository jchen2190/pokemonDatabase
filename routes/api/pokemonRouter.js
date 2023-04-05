const router = require("express").Router();

const {
    getAllPokemon,
    getOnePokemon,
    createOnePokemon,
    deleteOnePokemon,
    updateOnePokemon
} = require("../../controllers/api/pokemonController");
// const { updateOne } = require("../../models/pokemonModel");

// localhost:8080/api/pokemon/...
router.get("/allPokemon", getAllPokemon);
router.get("/onePokemon/:name", getOnePokemon);
router.post("/createOnePokemon", createOnePokemon);
router.delete("/deleteOnePokemon/:name", deleteOnePokemon);
router.put("/updateOnePokemon/:name", updateOnePokemon)

module.exports = router;