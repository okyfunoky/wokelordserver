"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
//const authRoutes = require('./auth');
const gameRoutes = require("./game");
//router.use('/auth', authRoutes);
router.use("/game", gameRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map