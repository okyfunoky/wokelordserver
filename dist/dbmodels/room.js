"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let RoomSchema = new Schema({
    name: String,
    type: String,
    happiness: Number,
    rent: Number,
    maintenance: Number
    //tenants later
});
let Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
//# sourceMappingURL=room.js.map