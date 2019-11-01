"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let db = require("../dbmodels");
mongoose.connect("mongodb://localhost/wokelord", { useNewUrlParser: true });
function createTower(towerName) {
    db.Tower.create({ name: towerName })
        .then(function (dbTower) {
        console.log(dbTower);
    })
        .catch(function (err) {
        console.log(err);
    });
}
function addFloorToTower(towerName, floor) {
    const filter = { name: towerName };
    db.Floor.create({ number: floor, towerName: towerName })
        .then(function (dbFloor) {
        return db.Tower.findOneAndUpdate(filter, { $push: { floors: dbFloor._id } }, { new: true });
    })
        .then(function (dbTower) {
        console.log(dbTower);
    })
        .catch(function (err) {
        console.log(err);
    });
}
let rooms = [
    {
        name: "A1",
        type: "Apartment"
    },
    {
        name: "A2",
        type: "Office"
    },
    {
        name: "A3",
        type: "Hotel"
    },
    {
        name: "A4",
        type: "Office"
    }
];
function addRoomToFloor(floor, towerName, room) {
    const filter = { number: floor, towerName: towerName };
    db.Room.create({ room })
        .then(function (dbRoom) {
        return db.Floor.findOneAndUpdate(filter, { $push: { rooms: dbRoom._id } }, 
        //returns the new object
        { new: true });
    })
        .then(function (dbFloor) {
        console.log(dbFloor);
    })
        .catch(function (err) {
        console.log(err);
    });
}
const floors = [1, 2, 3, 4, 5, 6, 7, 8];
const towerName = "Default Tower";
createTower(towerName);
floors.forEach((floor) => {
    addFloorToTower(towerName, floor);
    rooms.forEach((room) => {
        addRoomToFloor(floor, towerName, room);
    });
});
//# sourceMappingURL=dbseeds.js.map