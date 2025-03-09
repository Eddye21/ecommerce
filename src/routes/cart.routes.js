import express from "express"
import Cart from "../models/cart.model.js"
import Product from "../models/products.model.js"

const cartRouter = express.Router()

//Endpoits
//Ver Productos de ese carrito 

//Obtener todos los carritos
cartRouter.get("/", async(req, res) => {
    try {
        const getCart = await Cart.find()
        res.status(200).send({status: "Succes", payload: getCart})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

//Obtener un carrito mediante su id
cartRouter.get("/:cid", async(req, res) => {
    try {
        const { cid } = req.params
        const getCartById = await Cart.fidnOne({cid})

        res.status(200).send({status: "Succes", payload: getCart})
    } catch (error) {
        res.status(500).send({status: "Error",message: error.message})
    }
})

//Agregar al carrito el producto mediante params
cartRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params

        const getProductById = await Product.findOne({_id :pid})

        const addProductToCard = await Cart.updateOne(
            { _id: cid },
            { $push: { products: { productId: getProductById._id, qty: 1 } } }
        )
        const populatedCart = await Cart.findById(cid).populate("products.productId")

        res.status(200).send({ status: "Success", payload: populatedCart })
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message })
    }
})

//Editar productos dentro del carrito
cartRouter.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const { product} = req.body

        const editProduct = await Cart.updateOne(
            { _id: cid, "products.productId": id },
            { $set: { "products.$": product } }
        )
        res.status(200).send({ status: "Success", payoload: editProduct})
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message })
    }
})

//Actualiza la cantidad de ejemplares 
cartRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { qty } = req.body;
        
        await Cart.updateOne(
            { _id: cid, "products.productId": pid },
            { $set: { "products.$.qty": qty } }
        )

        const populatedCart = await Cart.findById(cid).populate("products.productId")

        res.status(200).send({ status: "Success", payload: populatedCart})
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message })
    }
})

//Eliminar todos los productos del carrito
cartRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        
        await Cart.updateOne(
            { _id: cid },
            { $set: { product: [] } }
        )
        res.status(200).send({ status: "Success", message: "Todos los productos han sido eliminados del carrito" });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
})


export default cartRouter