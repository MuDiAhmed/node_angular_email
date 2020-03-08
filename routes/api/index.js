const router = require("express").Router();
const email = require("./email");

router.use("/api/email", email);

module.exports = router;
