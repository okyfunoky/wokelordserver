"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("./room");
class Floor {
    constructor(number) {
        this.Number = number;
        this.Rooms = new Array();
        //test method only
        for (let index = 0; index < testNames.length; index++) {
            const name = testNames[index];
            const type = testRoomNames[index];
            this.Rooms.push(new room_1.default(name, type));
        }
    }
}
exports.default = Floor;
let testNames = [
    "Dunder Mifflin",
    "Apartment",
    "McDonalds",
    "Wendy's",
    "Condo"
];
let testRoomNames = [
    "Office",
    "Apartment",
    "Restaurant",
    "Restaurant",
    "Condo"
];
//# sourceMappingURL=floor.js.map