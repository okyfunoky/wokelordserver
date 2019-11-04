"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const floor_1 = require("../models/floor");
let db = require("../dbmodels");
function buildRoom(roomType) {
    let roomInfo = {
        cost: 0,
        rent: 0,
        maintenance: 0,
        tenantCount: 0,
        size: 0
    };
    switch (roomType) {
        case "apartment":
            roomInfo.cost = 1000;
            roomInfo.rent = 800;
            roomInfo.maintenance = 200;
            roomInfo.tenantCount = 3;
            roomInfo.size = 2;
            break;
        case "office":
            roomInfo.cost = 2000;
            roomInfo.rent = 1600;
            roomInfo.maintenance = 400;
            roomInfo.tenantCount = 8;
            roomInfo.size = 3;
            break;
        case "restaurant":
            roomInfo.cost = 5000;
            roomInfo.rent = 2500;
            roomInfo.maintenance = 500;
            roomInfo.tenantCount = 4;
            roomInfo.size = 6;
            break;
        case "condo":
            roomInfo.cost = 5000;
            roomInfo.rent = 300; //condo rents are different, its more of dues
            roomInfo.maintenance = 100;
            roomInfo.tenantCount = 4;
            roomInfo.size = 4;
            break;
        case "entertainment":
            roomInfo.cost = 10000;
            roomInfo.rent = 4500;
            roomInfo.maintenance = 1200;
            roomInfo.tenantCount = 5;
            roomInfo.size = 6;
            break;
        case "retail":
            roomInfo.cost = 5000;
            roomInfo.rent = 2500;
            roomInfo.maintenance = 800;
            roomInfo.tenantCount = 3;
            roomInfo.size = 4;
            break;
        case "hotel":
            roomInfo.cost = 2500;
            roomInfo.rent = 1800;
            roomInfo.maintenance = 1000;
            roomInfo.tenantCount = 1;
            roomInfo.size = 1;
            break;
    }
    return roomInfo;
    // let room = new Room("id", roomType, roomInfo.rent, roomInfo.maintenance);
    // room.Tenants = new Array<Tenant>();
    // for (let index = 0; index < roomInfo.tenantCount; index++) {
    //   let newTenant = new Tenant();
    //   room.Tenants.push(newTenant);
    // }
    // if(floorToBuildOn.OccupiedSpace + roomInfo.size <= 12){
    //   floorToBuildOn.Rooms.push(room);
    //   floorToBuildOn.OccupiedSpace += roomInfo.size;
    // }else{
    //     console.log("Not enough space");
    // }
}
function addRoomToFloor(floorid, towerName, room) {
    const filter = { _id: floorid, towerName: towerName };
    console.log("Room to build: " + room.roomName);
    let parsedRoom = buildRoom(room.roomType);
    console.log(parsedRoom);
    return db.Room.create({ name: room.roomName, type: room.roomType, happiness: room.happiness, rent: parsedRoom.rent, maintenance: parsedRoom.maintenance })
        .then(function (dbRoom) {
        return db.Floor.findOneAndUpdate(filter, { $push: { rooms: dbRoom._id } }, 
        //returns the new object
        { new: true }).populate("rooms");
    });
}
exports.addRoomToFloor = addRoomToFloor;
function buildFloor(id, tower) {
    let newFloor = new floor_1.default(id);
    tower.Floors.push(newFloor);
    newFloor.Rooms = new Array();
}
exports.buildFloor = buildFloor;
function addFloorToTower(towerName, floor) {
    const filter = { name: towerName };
    return db.Floor.create({ number: floor, towerName: towerName })
        .then(function (dbFloor) {
        console.log(dbFloor);
        return db.Tower.findOneAndUpdate(filter, { $push: { floors: dbFloor._id } }, { new: true }).populate("floors");
    });
}
exports.addFloorToTower = addFloorToTower;
function createTower(towerName) {
    return db.Tower.create({ name: towerName });
}
exports.createTower = createTower;
function getTower(towerName) {
    return db.Tower.find({ name: towerName }).populate("floors");
}
exports.getTower = getTower;
function getRoomsForFloor(floorId) {
    return db.Floor.find({ _id: floorId }).populate("rooms");
}
exports.getRoomsForFloor = getRoomsForFloor;
//# sourceMappingURL=gamescripts.js.map