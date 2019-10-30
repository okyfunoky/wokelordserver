"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const floor_1 = require("./floor");
class Tower {
    constructor(name) {
        this.name = name;
        this.Floors = floors.map((floor) => {
            return new floor_1.default(floor);
        });
    }
}
exports.default = Tower;
let floors = [1, 2, 3, 4, 5, 6, 7];
//# sourceMappingURL=tower.js.map