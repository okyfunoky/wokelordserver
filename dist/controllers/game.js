"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const game = require('../scripts/gamescripts');
var router = express.Router();
router.get('/test', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
router.get('/loadtower/:towername', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let towerName = req.params.towername;
        let tower = yield game.getTower(towerName);
        res.status(200).json(tower);
    });
});
router.get('/getpopulation/:towername', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let towerName = req.params.towername;
        let population = yield game.calculatePopulation(towerName);
        res.status(200).json(population);
    });
});
router.get('/getmoney/:towername', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let towerName = req.params.towername;
        let money = yield game.getTowerMoney(towerName);
        res.status(200).json(money);
    });
});
router.get('/loadrooms/:floorId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let floorId = req.params.floorId;
        let floor = yield game.getRoomsForFloor(floorId);
        console.log(floor);
        res.status(200).json(floor);
    });
});
//TODO: Convert back to post
router.post('/createtower/:towername', function (req, res) {
    const towerName = req.params.towername;
    //TODO: Start catching errors here
    game.createTower(towerName);
    res.status(200).send('Tower created');
});
router.post('/updatetowermoney/:towername/:adjustment', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Towername:" + req.params.towername);
        console.log("Adjust:" + req.params.adjustment);
        const towerName = req.params.towername;
        const adjustment = parseInt(req.params.adjustment);
        //TODO: Start catching errors here
        let tower = yield game.adjustTowerMoney(towerName, adjustment);
        res.status(200).json(tower);
    });
});
//TODO: Convert back to post
router.post('/buildroom/:towername/:floorid', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const towerName = req.params.towername;
        const floorid = req.params.floorid;
        const room = req.body;
        let floor = yield game.addRoomToFloor(floorid, towerName, room);
        res.status(200).json(floor);
    });
});
router.post('/buildfloor/:towername/:floor', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const towerName = req.params.towername;
        const floor = req.params.floor;
        var tower = yield game.addFloorToTower(towerName, floor);
        res.status(200).json(tower);
    });
});
router.get('/tracktenant', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
router.delete('/tracktenant', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
router.delete('/demolishRoom', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
router.post('/saveGame', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
router.get('/preview', function (req, res) {
    res.status(200).send('secretssssssssssssss');
});
module.exports = router;
//# sourceMappingURL=game.js.map