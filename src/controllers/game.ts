import * as express from "express";
const game = require('../scripts/gamescripts');

var router = express.Router();

router.get('/test', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

router.get('/loadtower/:towername', async function (req: any, res) {
    let towerName = req.params.towername;

    let tower = await game.getTower(towerName);
    res.status(200).json(tower);
})

//TODO: Convert back to post
router.post('/createtower/:towername', function (req: any, res) {
    const towerName = req.params.towername;

    //TODO: Start catching errors here
    game.createTower(towerName);

    res.status(200).send('Tower created')
})

//TODO: Convert back to post
router.post('/buildroom/:towername/:floorid/:roomName/:roomType', async function (req: any, res) {
    const towerName = req.params.towername;
    const floorid = req.params.floorid;
    //const room = req.body;
    const roomName = req.params.roomName;
    const roomType = req.params.roomType;
    //console.log(room)
    
    let room = await game.addRoomToFloor(floorid, towerName, roomName, roomType);


    res.status(200).json(room);
})

router.post('/buildfloor/:towername/:floor', async function (req: any, res) {
    const towerName = req.params.towername;
    const floor = req.params.floor;

    var tower = await game.addFloorToTower(towerName,floor);

    res.status(200).json(tower);
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