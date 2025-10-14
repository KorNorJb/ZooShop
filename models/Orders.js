import { Schema, SchemaType, model } from "mongoose";

const Order = new Schema({
    order_number: { type: String, trim: true },
    order: { type: String },
    total: { type: Number },
    adress: { type: Schema.Types.Mixed },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "Transferred to delivery service" },
    courier: [{ type: String, ref: 'Courier' }]
})
export default model('Order', Order)