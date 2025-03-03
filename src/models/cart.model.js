import mongoose  from "mongoose"

const cartSchema = mongoose.Schema({
    product: Array
})

const Cart = mongoose.model("cart", cartSchema)

export default Cart