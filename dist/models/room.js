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
    }
}
exports.default = Room;
let testNames = ["Mike", "Mary", "Bill", "Joe", "Steve", "George", "John", "Julia"];
//# sourceMappingURL=room.js.map