import * as express from "express";
const router = express.Router();

//const authRoutes = require('./auth');
const gameRoutes = require("./game")

//router.use('/auth', authRoutes);
router.use("/game", gameRoutes);

module.exports = router;