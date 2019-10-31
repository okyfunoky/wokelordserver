"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_1 = require("./tenant");
class Room {
    constructor(name, type, rent, maintenance) {
        this.name = name;
        this.type = type;
        this.rent = rent;
        this.maintenanceCost = maintenance;
        //test method only
        this.Tenants = testNames.map(() => {
            return new tenant_1.default();
        });
        this.rent = 500;
        this.maintenanceCost = 75;
    }
    calculateHappinessForRoom() {
        let maintenenceRatio = this.rent / this.maintenanceCost;
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