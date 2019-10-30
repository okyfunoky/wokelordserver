"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tower_1 = require("../models/tower");
console.log("Starting test...");
let newTower = new tower_1.default("Mike's Tower");
console.log(`${newTower.name} has ${newTower.Floors.length} floors`);
newTower.Floors.forEach(floor => {
    console.log(`${floor.Number} has ${floor.Rooms.length}`);
    floor.Rooms.forEach((room) => {
        console.log(`There are ${room.Tenants.length} tenants in ${room.name}, which is a ${room.type}`);
    });
});
//# sourceMappingURL=gametest.js.map