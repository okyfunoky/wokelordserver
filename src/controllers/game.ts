import * as express from "express";
const game = require('../scripts/gamescripts');

var router = express.Router();

router.get('/test', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

router.get('/loadtower', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

//TODO: Convert back to post
router.get('/createtower/:towername', function (req: any, res) {
    const towerName = req.params.towername;

    //TODO: Start catching errors here
    game.createTower(towerName);

    res.status(200).send('secretssssssssssssss')
})

//TODO: Convert back to post
router.get('/buildroom/:towername/:floor/:room', function (req: any, res) {
    const towerName = req.params.towername;
    const floor = req.params.floor;
    const room = req.params.body;
    
    game.addRoomToFloor(floor, towerName, room);


    res.status(200).send('secretssssssssssssss')
})

//TODO: Convert back to post request w/ body
router.get('/buildfloor/:towername/:floor', function (req: any, res) {
    const towerName = req.params.towername;
    const floor = req.params.floor;

    game.addFloorToTower(towerName,floor);

    res.status(200).send('secretssssssssssssss')
})

router.get('/tracktenant', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

router.delete('/tracktenant', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

router.delete('/demolishRoom', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

router.post('/saveGame', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

router.get('/preview', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

module.exports = router;