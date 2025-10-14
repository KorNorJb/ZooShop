import { Schema, model } from "mongoose"

const Product = new Schema({
    name_product: { type: String, required: true, trim: true },
    desc_product: { type: String },
    articul_product: { type: String, required: true, trim: true, unique: true },
    coast_product: { type: Number, required: true },
    promotionCoast_product: { type: Number },
    image_product: { type: String, required: true, trim: true },
    type_product: { type: String, required: true, trim: true },
    brand_product: { type: String, required: true, trim: true },
    weight_product: { type: Schema.Types.Mixed, required: true },
    netQua_product: { type: Schema.Types.Mixed, required: true },
    form_product: { type: String, required: true, trim: true },
    age_product: { type: Schema.Types.Mixed, required: true },
    flavour_product: { type: String, required: true, trim: true },
    available_product: { type: Number, required: true }
})
export default model('Product', Product)