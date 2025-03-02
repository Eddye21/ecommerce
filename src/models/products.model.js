import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    price: Number,
    code: String,
    stock: Number,
    status: Boolean
})

productSchema.plugin(paginate)

const Product = mongoose.model("product", productSchema)

export default Product