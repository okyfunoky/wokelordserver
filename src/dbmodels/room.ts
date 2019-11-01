import * as mongoose from 'mongoose'

let Schema = mongoose.Schema;

let RoomSchema = new Schema({
    name: String,
    type: String,
    //tenants later
})

let Room = mongoose.model("Room", RoomSchema);
module.exports = Room;