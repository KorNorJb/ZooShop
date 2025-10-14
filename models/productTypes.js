import { Schema, model } from "mongoose"

const productType = new Schema({
    type: { type: String, unique: true, required: true, trim: true }
})
export default model('productType', productType)