const router = require("express").Router();

const {
    createUser,
    logInUser,
    addFavoritePokemonToUser
} = require("../../controllers/api/userController");

// localhost:3000/api/user/...
router.post("/createUser", createUser);
router.post("/logInUser", logInUser);
router.put("/addFavoritePokemon", addFavoritePokemonToUser);

module.exports = router;