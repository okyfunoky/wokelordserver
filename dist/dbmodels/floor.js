"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let FloorSchema = new Schema({
    number: {
        type: Number,
    },
    towerName: String,
    occupiedSpace: Number,
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "Room"
        }
    ]
});
let Floor = mongoose.model("Floor", FloorSchema);
module.exports = Floor;
//# sourceMappingURL=floor.js.map