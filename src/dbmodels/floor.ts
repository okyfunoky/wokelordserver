import * as mongoose from 'mongoose'

let Schema = mongoose.Schema;

let FloorSchema = new Schema({
    number: {
        type: Number,
    },
    towerName: String,
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "Room"
        }
    ]
})

let Floor = mongoose.model("Floor", FloorSchema);
module.exports = Floor;