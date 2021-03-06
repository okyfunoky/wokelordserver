"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tower_1 = require("../models/tower");
const room_1 = require("../models/room");
const tenant_1 = require("../models/tenant");
const floor_1 = require("../models/floor");
console.log("Starting test...");
let newTower = new tower_1.default("Mike's Tower");
console.log(`${newTower.name} has ${newTower.Floors.length} floors`);
newTower.getPopulation(true);
console.log(`The population of ${newTower.name} is ${newTower.Population}`);
function buildRoom(roomType, floorNumber) {
    let floorToBuildOn = newTower.Floors.find(floor => {
        return floor.Number === floorNumber;
    });
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
    let room = new room_1.default("id", roomType, roomInfo.rent, roomInfo.maintenance);
    room.Tenants = new Array();
    for (let index = 0; index < roomInfo.tenantCount; index++) {
        let newTenant = new tenant_1.default();
        room.Tenants.push(newTenant);
    }
    if (floorToBuildOn.OccupiedSpace + roomInfo.size <= 12) {
        floorToBuildOn.Rooms.push(room);
        floorToBuildOn.OccupiedSpace += roomInfo.size;
    }
    else {
        console.log("Not enough space");
    }
}
function buildFloor(id) {
    let newFloor = new floor_1.default(id);
    newTower.Floors.push(newFloor);
    newFloor.Rooms = new Array();
}
//buildRoom("apartment",2);
buildFloor(newTower.Floors.length);
buildRoom("office", newTower.Floors.length - 1);
buildRoom("office", newTower.Floors.length - 1);
buildRoom("office", newTower.Floors.length - 1);
buildRoom("office", newTower.Floors.length - 1);
buildRoom("office", newTower.Floors.length - 1);
newTower.getPopulation(true);
console.log(`${newTower.name} has ${newTower.Floors.length} floors`);
console.log(`The population of ${newTower.name} is ${newTower.Population}`);
newTower.calculateGlobalHappiness(true);
console.log(newTower.GlobalHappiness);
//# sourceMappingURL=gametest.js.map