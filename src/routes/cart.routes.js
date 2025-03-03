import express from "express"
import Cart from "../models/cart.model/js"

const cartRouter = express.Router()

//Endpoits

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await Cart.updateOne(
            { _id: cid },
            { $pull: { products: { productId: pid } } }
        );
        res.status(200).send({ status: "Success", message: "Producto eliminado del carrito" })
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message })
    }
})

cartRouter.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body

        await Cart.updateOne(
            { _id: cid },
            { $set: { products } }
        )
        res.status(200).send({ status: "Success", message: "Carrito actualizado" })
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message })
    }
})

cartRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        await Cart.updateOne(
            { _id: cid, "products.productId": pid },
            { $set: { "products.$.quantity": quantity } }
        );
        res.status(200).send({ status: "Success", message: "Cantidad del producto actualizada" });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
})

cartRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        await Cart.updateOne(
            { _id: cid },
            { $set: { products: [] } }
        );
        res.status(200).send({ status: "Success", message: "Todos los productos han sido eliminados del carrito" });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
});


export default cartRouter