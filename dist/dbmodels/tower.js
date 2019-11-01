"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let TowerSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    floors: [
        {
            type: Schema.Types.ObjectId,
            ref: "Floor"
        }
    ]
});
let Tower = mongoose.model("Tower", TowerSchema);
module.exports = Tower;
//# sourceMappingURL=tower.js.map