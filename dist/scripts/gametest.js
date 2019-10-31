"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tower_1 = require("../models/tower");
const room_1 = require("../models/room");
const tenant_1 = require("../models/tenant");
console.log("Starting test...");
let newTower = new tower_1.default("Mike's Tower");
console.log(`${newTower.name} has ${newTower.Floors.length} floors`);
newTower.getPopulation(true);
console.log(`The population of ${newTower.name} is ${newTower.Population}`);
// newTower.areElevatorsCrowded(true);
// console.log(`Are the elevators crowded? ${newTower.ElevatorsAreCrowded}`)
// newTower.calcuateMonthlyIncome(true);
// console.log(`Current Money: ${newTower.Money}`)
// newTower.Floors.forEach(floor => {
//     console.log(`${floor.Number} has ${floor.Rooms.length}`);
//     floor.Rooms.forEach((room)=>{
//         console.log(`The tenants in ${room.name}, which is a ${room.type} are ${room.Tenants}`)
//     })
// });
function buildRoom(roomType, floorNumber, positionOnFloor) {
    let floorToBuildOn = newTower.Floors.find((floor) => {
        return floor.Number === floorNumber;
    });
    let roomInfo = {
        cost: 0,
        rent: 0,
        maintenance: 0,
        tenantCount: 0,
    };
    switch (roomType) {
        case "apartment":
            roomInfo.cost = 1000;
            roomInfo.rent = 800;
            roomInfo.maintenance = 200;
            roomInfo.tenantCount = 3;
            break;
        case "office":
            roomInfo.cost = 2000;
            roomInfo.rent = 1600;
            roomInfo.maintenance = 400;
            roomInfo.tenantCount = 8;
            break;
        case "restaurant":
            roomInfo.cost = 5000;
            roomInfo.rent = 2500;
            roomInfo.maintenance = 500;
            roomInfo.tenantCount = 3;
            break;
        case "condo":
            roomInfo.cost = 5000;
            roomInfo.rent = 300; //condo rents are different, its more of dues
            roomInfo.maintenance = 100;
            roomInfo.tenantCount = 4;
            break;
        case "entertainment":
            roomInfo.cost = 10000;
            roomInfo.rent = 4500;
            roomInfo.maintenance = 1200;
            roomInfo.tenantCount = 5;
            break;
    }
    let room = new room_1.default("id", roomType, roomInfo.rent, roomInfo.maintenance);
    room.Tenants = new Array();
    for (let index = 0; index < roomInfo.tenantCount; index++) {
        let newTenant = new tenant_1.default();
        room.Tenants.push(newTenant);
    }
    floorToBuildOn.Rooms.push(room);
}
buildRoom("apartment", 2, 2);
newTower.getPopulation(true);
console.log(`The population of ${newTower.name} is ${newTower.Population}`);
//# sourceMappingURL=gametest.js.map