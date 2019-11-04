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
//TODO: Convert back to post
router.post('/buildroom/:towername/:floorid/:roomName/:roomType', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const towerName = req.params.towername;
        const floorid = req.params.floorid;
        //const room = req.body;
        const roomName = req.params.roomName;
        const roomType = req.params.roomType;
        //console.log(room)
        let floor = yield game.addRoomToFloor(floorid, towerName, roomName, roomType);
        console.log(floor);
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