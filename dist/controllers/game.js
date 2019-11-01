"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
router.get('/test', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
module.exports = router;
//# sourceMappingURL=game.js.map