import { Schema, model } from "mongoose";

const DelM = new Schema({
    value: { type: String, unique: true, default: "OnFoot" },

})
export default model('DelM', DelM)