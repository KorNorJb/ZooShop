import { SchemaTypes } from "mongoose"
import { Schema, model } from "mongoose"

const Courier = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    password: { type: String, unique: true, required: true },
    telephone: { type: Number, required: true, trim: true },
    delivery_method: [{ type: String, required: true, trim: true, ref: 'DeliveryM' }],
    completed_orders: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    requisites: { type: String, required: true, trim: true },
    working_hours: { type: SchemaTypes.Mixed, required: true, trim: true },
    registration_date: { type: Date, default: Date.now },
    roles: [{ type: String, ref: 'Role' }]
})
export default model('Courier', Courier)