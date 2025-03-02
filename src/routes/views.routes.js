import express from "express"
import Product from "../models/products.model.js"

const viewsRouter = express ()

viewsRouter.get("/products", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        
        const listProducts = await Product.paginate({}, {page, limit, lean: true})
        console.log(listProducts)
        res.status(200).render("home", listProducts)
    } catch (error) {
        res.status(500).send({status: "Error", message: error.message})
    }
})

viewsRouter.get("/:uid", async(req, res) => {
    try {
        const uid = req.params.uid
        const getProductById = await Product.paginate({_id: uid})
        console.log(getProductById.docs)
        res.status(200).send({payload: getProductById.docs})
    } catch (error) {
        res.status(500).send({status: "Error", message: error.messages})
    }
})

export default viewsRouter