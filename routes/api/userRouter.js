const router = require("express").Router();

const {
    createUser
} = require("../../controllers/api/userController");

// localhost:3000/api/user/...
router.post("/createUser", createUser);

module.exports = router;