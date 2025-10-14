import { Schema, model } from "mongoose"

const User = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, unique: true, required: true },
    telephone: { type: Number, required: true, trim: true },
    isActivated: { type: Boolean, default: false },
    isAuthorization: { type: Boolean, default: false },
    activationLink: { type: String, required: true },
    Email: { type: String, unique: true, required: true, trim: true },
    date: { type: Date, default: () => Date.now() + 5 * 60 * 60 * 1000 },
    roles: [{ type: String, ref: 'Role' }]
})
export default model('User', User)