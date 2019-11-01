import * as mongoose from 'mongoose'

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    Towers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tower"
        }
    ]
})

let User = mongoose.model("User", UserSchema);
module.exports = User;