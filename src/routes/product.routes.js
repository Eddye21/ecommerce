import express from "express"
import Product from "../models/products.model.js"

const productRouter = express.Router()

productRouter.get("/", async(req, res) => {
    try {
        const data = await Product.paginate({})
        console.log(data)
        
        res.status(200).send({status: "success", payload: data})
    } catch (error) {
        res.status(500).send({status: "error", message: error.message})
    }
})

productRouter.post("/", async(req, res) => {
    try {
        const {
            title,
            description,
            thumbnail,
            price,
            code,
            stock
        } = req.body

        const status = stock === 0 ? false : true
        const data = await Product.insertOne({title, description, thumbnail, price, code, stock, status})

        res.status(201).send({status: "success", payload: data})
    } catch (error) {
        res.status(500).send({status: "error", message: error.message})
    }
})

export default productRouter