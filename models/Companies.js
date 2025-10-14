import { Schema, model } from "mongoose";

const Comp = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    image: { type: String, unique: true, required: true, trim: true }

})
export default model('Companies', Comp)