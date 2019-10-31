"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_1 = require("./tenant");
class Room {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        //test method only
        this.Tenants = testNames.map((name) => {
            return new tenant_1.default(name);
        });
        this.rent = 500;
        this.maintenanceCost = 75;
    }
    calculateHappinessForRoom() {
        var maintenenceRatio = this.rent / this.maintenanceCost;
        console.log(`Maint ratio is ${maintenenceRatio}`);
        //when a room makes 10x it's maintenance cost, it's unhappy
        if (maintenenceRatio > 10) {
            this.roomHappiness -= 10;
        }
    }
}
exports.default = Room;
let testNames = ["Mike", "Mary", "Bill", "Joe", "Steve", "George", "John", "Julia"];
//# sourceMappingURL=room.js.map