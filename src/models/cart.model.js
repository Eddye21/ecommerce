import mongoose  from "mongoose"

const cartSchema = mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product"},
        qty: Number
    }]
})

const Cart = mongoose.model("cart", cartSchema)

export default Cart