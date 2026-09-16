const express = require("express");
const router = express.Router();


const aiController = require("../controllers/ai");

router.post("/recommend", aiController.recommend);

module.exports = router;