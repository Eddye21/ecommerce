import express from "express"
import Product from "../models/products.model.js"

const viewsRouter = express ()

viewsRouter.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        
        const listProducts = await Product.paginate({}, {page, limit, lean: true})
        res.status(200).render("home", listProducts)
    } catch (error) {
        res.status(500).send({status: "Error", message: error.message})
    }
})

viewsRouter.get("/realTimeProducts", async(req, res) => {
    try {
        const productRealTime = await Product.paginate({}, {lean: true})
        res.status(200).render("realTimeProducts", productRealTime)
    } catch (error) {
        res.status(500).send({status: "Error", message: error.message})
    }
})

viewsRouter.get("/:uid", async(req, res) => {
    try {
        const uid = req.params.uid
        
        const getProductById = await Product.paginate({_id: uid}, {lean: true})
        res.status(200).render("home", getProductById)
    } catch (error) {
        res.status(500).send({status: "Error", message: error.messages})
    }
})

export default viewsRouter