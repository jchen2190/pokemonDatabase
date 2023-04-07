const router = require("express").Router();

const {
    getIndexPage,
    renderAllPokemon,
    renderOnePokemonPage,
    renderCreatePokemonForm,
    renderUpdatePokemonForm,
    renderSignUpForm,
    renderLogInForm,
} = require("../../controllers/client/viewController");

// localhost:8080/...
router.get("/", getIndexPage);
router.get("/allMons", renderAllPokemon);
router.get("/oneMon/:name", renderOnePokemonPage);
router.get("/createOneMon", renderCreatePokemonForm);
router.get("/updateMon/:name", renderUpdatePokemonForm);

router.get("/signUp", renderSignUpForm);
router.get("/logIn", renderLogInForm);

module.exports = router;