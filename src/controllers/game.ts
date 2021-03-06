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

router.get('/getpopulation/:towername', async function (req: any, res) {
    let towerName = req.params.towername;
    let population = await game.calculatePopulation(towerName);
    res.status(200).json(population);
})

router.get('/updatemonth/:towername', async function (req: any, res) {
    let towerName = req.params.towername;
    let tower = await game.calculateIncome(towerName);
    res.status(200).json(tower);
})

router.get('/getmoney/:towername', async function (req: any, res) {
    let towerName = req.params.towername;
    let money = await game.getTowerMoney(towerName);
    res.status(200).json(money);
})

router.get('/loadrooms/:floorId', async function (req: any, res) {
    let floorId = req.params.floorId;

    let floor = await game.getRoomsForFloor(floorId);
    console.log(floor);
    res.status(200).json(floor);
})

//TODO: Convert back to post
router.post('/createtower/:towername', function (req: any, res) {
    const towerName = req.params.towername;

    //TODO: Start catching errors here
    game.createTower(towerName);

    res.status(200).send('Tower created')
})

router.post('/updatetowermoney/:towername/:adjustment', async function (req: any, res) {
    console.log("Towername:" + req.params.towername);
    console.log("Adjust:" + req.params.adjustment);
    const towerName = req.params.towername;
    const adjustment = parseInt(req.params.adjustment);

    //TODO: Start catching errors here
    let tower = await game.adjustTowerMoney(towerName, adjustment);

    res.status(200).json(tower);
})

//TODO: Convert back to post
router.post('/buildroom/:towername/:floorid', async function (req: any, res) {
    const towerName = req.params.towername;
    const floorid = req.params.floorid;
    const room = req.body;
    let floor = await game.addRoomToFloor(floorid, towerName, room);
    
    res.status(200).json(floor);
})

router.post('/buildfloor/:towername/:floor', async function (req: any, res) {
    const towerName = req.params.towername;
    const floor = req.params.floor;

    var tower = await game.addFloorToTower(towerName,floor);

    res.status(200).json(tower);
})

router.get('/loadtowers', async function (req: any, res) {
    let towers = await game.loadTowers();
    res.status(200).json(towers);
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