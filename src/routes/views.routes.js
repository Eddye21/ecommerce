import express from "express"
import Product from "../models/products.model.js"

const viewsRouter = express ()

viewsRouter.get("/", async(req, res) => {
    try {
        const getProduct = parseInt(req.query.page) || 1
        const limit = 20

        const listProducts = await Product.paginate({}, {page, limit, lean: true})
        res.render("home", listProducts)
    } catch (error) {
        res.status(500).send({status: "Error", message: error.message})
    }
})

viewsRouter.get("/:uid", async(req, res) => {
    try {
        const uid = req.params.uid
        const getProductById = await Product.paginate({uid})
        console.log(getProductById)
        res.status(200).send({payload: getProductById})
    } catch (error) {
        res.status(500).send({status: "Error", message: error.messages})
    }
})

export default viewsRouter