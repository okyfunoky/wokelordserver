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
let db = require("../dbmodels");
const floorCost = -100000;
function buildRoom(towerName, roomType, floorId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Build room function...");
        let roomInfo = {
            cost: 0,
            rent: 0,
            maintenance: 0,
            tenantCount: 0,
            size: 0,
            buildable: false
        };
        switch (roomType) {
            case "apartment":
                roomInfo.cost = -1000;
                roomInfo.rent = 800;
                roomInfo.maintenance = -200;
                roomInfo.tenantCount = 3;
                roomInfo.size = 2;
                break;
            case "office":
                roomInfo.cost = -2000;
                roomInfo.rent = 1600;
                roomInfo.maintenance = -400;
                roomInfo.tenantCount = 8;
                roomInfo.size = 3;
                break;
            case "restaurant":
                roomInfo.cost = -5000;
                roomInfo.rent = 2500;
                roomInfo.maintenance = -500;
                roomInfo.tenantCount = 4;
                roomInfo.size = 6;
                break;
            case "condo":
                roomInfo.cost = -5000;
                roomInfo.rent = 300; //condo rents are different, its more of dues
                roomInfo.maintenance = -100;
                roomInfo.tenantCount = 4;
                roomInfo.size = 4;
                break;
            case "entertainment":
                roomInfo.cost = -10000;
                roomInfo.rent = 4500;
                roomInfo.maintenance = -1200;
                roomInfo.tenantCount = 5;
                roomInfo.size = 6;
                break;
            case "retail":
                roomInfo.cost = -5000;
                roomInfo.rent = 2500;
                roomInfo.maintenance = -800;
                roomInfo.tenantCount = 3;
                roomInfo.size = 4;
                break;
            case "hotel":
                roomInfo.cost = -2500;
                roomInfo.rent = 1800;
                roomInfo.maintenance = -1000;
                roomInfo.tenantCount = 1;
                roomInfo.size = 1;
                break;
        }
        let floor = yield getFloor(floorId);
        console.log("Build log logging floor");
        console.log(floor);
        let newSpace = parseInt(floor[0].occupiedSpace) + roomInfo.size;
        console.log(newSpace);
        if (newSpace <= 12) {
            //we can build, allow it.
            //need $$ calc here, too
            roomInfo.buildable = true;
            //update floor in DB with new space
            yield updateFloorSpace(towerName, floorId, newSpace);
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
    });
}
function addRoomToFloor(floorid, towerName, room) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = { _id: floorid, towerName: towerName };
        console.log("Room to build: " + room.roomName);
        let parsedRoom = yield buildRoom(towerName, room.roomType, floorid);
        let tenants = populateTenants(parsedRoom.tenantCount);
        console.log("Got parsed room...");
        if (parsedRoom.buildable) {
            let newTower = yield adjustTowerMoney(towerName, parsedRoom.cost);
            return db.Room.create({ name: room.roomName, type: room.roomType, happiness: room.happiness, rent: parsedRoom.rent, maintenance: parsedRoom.maintenance, tenants: tenants })
                .then(function (dbRoom) {
                return db.Floor.findOneAndUpdate(filter, { $push: { rooms: dbRoom._id } }, 
                //returns the new object
                { new: true }).populate("rooms");
            });
        }
        else {
            return false;
        }
    });
}
exports.addRoomToFloor = addRoomToFloor;
function adjustTowerMoney(towerName, adjustment) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = { name: towerName };
        let tower = yield getTower(towerName);
        console.log(tower);
        let newValue = tower[0].money + adjustment;
        let update = yield db.Tower.findOneAndUpdate(filter, { money: newValue }, { new: true });
        return update;
    });
}
exports.adjustTowerMoney = adjustTowerMoney;
function populateTenants(tenantCount) {
    let tenants = [];
    for (let index = 0; index < tenantCount; index++) {
        let tenant = {
            name: "",
            happiness: 50,
        };
        tenants.push(tenant);
    }
    return tenants;
}
function addFloorToTower(towerName, floor) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = { name: towerName };
        let newTower = yield adjustTowerMoney(towerName, floorCost);
        return db.Floor.create({ number: floor, towerName: towerName, occupiedSpace: 0 })
            .then(function (dbFloor) {
            console.log(dbFloor);
            return db.Tower.findOneAndUpdate(filter, { $push: { floors: dbFloor._id } }, { new: true }).populate("floors");
        });
    });
}
exports.addFloorToTower = addFloorToTower;
function updateFloorSpace(towerName, floorId, newSpace) {
    const filter = { _id: floorId };
    return db.Floor.findOneAndUpdate(filter, { occupiedSpace: newSpace });
}
exports.updateFloorSpace = updateFloorSpace;
function createTower(towerName) {
    return db.Tower.create({ name: towerName, money: 10000000 });
}
exports.createTower = createTower;
function getTower(towerName) {
    console.log("Getting..." + towerName);
    return db.Tower.find({ name: towerName }).populate("floors");
}
exports.getTower = getTower;
function getRoomsForFloor(floorId) {
    return db.Floor.find({ _id: floorId }).populate("rooms");
}
exports.getRoomsForFloor = getRoomsForFloor;
function getFloor(floorId) {
    return db.Floor.find({ _id: floorId });
}
exports.getFloor = getFloor;
function calculatePopulation(towerName) {
    return __awaiter(this, void 0, void 0, function* () {
        let population = 0;
        let tower = yield getTower(towerName);
        let floors = tower[0].floors;
        for (const floor of floors) {
            let currentFloor = yield getRoomsForFloor(floor._id);
            for (const room of currentFloor[0].rooms) {
                population += room.tenants.length;
            }
        }
        return population;
    });
}
exports.calculatePopulation = calculatePopulation;
function getTowerMoney(towerName) {
    return __awaiter(this, void 0, void 0, function* () {
        let tower = yield getTower(towerName);
        let money = tower[0].money;
        return money;
    });
}
exports.getTowerMoney = getTowerMoney;
//# sourceMappingURL=gamescripts.js.map