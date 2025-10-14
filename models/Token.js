import { Schema, model } from "mongoose"

const TokenSheme = new Schema({
    username: { type: Schema.Types.ObjectId, trim: true, ref: "User" },
    refreshToken: { type: String, required: true }
})
export default model('Token', TokenSheme)