const express = require("express")
const {handleSignUp}  = require("../controllers/user")
const router = express.Router();

router.post('/',handleSignUp);

module.exports = router;