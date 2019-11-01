import * as mongoose from 'mongoose'

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
})

let Tower = mongoose.model("Tower", TowerSchema);
module.exports = Tower;