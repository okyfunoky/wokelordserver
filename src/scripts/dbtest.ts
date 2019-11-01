import * as mongoose from "mongoose";

let db = require("../dbmodels");

mongoose.connect("mongodb://localhost/wokelord", { useNewUrlParser: true });

function createTower(towerName: string){
    db.Tower.create({ name: towerName })
    .then(function(dbTower) {
      console.log(dbTower);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function addFloorToTower(towerName: string, floor: number){
    const filter = {name: towerName}
    db.Floor.create({ number: floor })
    .then(function(dbFloor) {
      return db.Tower.findOneAndUpdate(
        filter,
        { $push: { floors: dbFloor._id } },
        { new: true }
      );
    })
    .then(function(dbTower) {
      console.log(dbTower);
    })
    .catch(function(err) {
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

function addRoomToFloor(floor: number, room) {
    const filter = {number: floor};
  
    db.Room.create({ room })
    .then(function(dbRoom) {
      return db.Floor.findOneAndUpdate(
        filter,
        { $push: { rooms: dbRoom._id } },
        //returns the new object
        { new: true }
      );
    })
    .then(function(dbFloor) {
      console.log(dbFloor);
    })
    .catch(function(err) {
      console.log(err);
    });
}

const towerName = "Mike's Tower";
const currentFloor = 2;
createTower(towerName);
addFloorToTower(towerName,currentFloor);
rooms.forEach((room)=>{
    addRoomToFloor(currentFloor,room);
})