import express from "express"
import Product from "../models/products.model.js"

const viewsRouter = express ()

viewsRouter.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 10
        
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
        const getProductById = await Product.paginate({_id: uid}, {lean: true})
        console.log(getProductById.docs)
        res.status(200).render("home", getProductById)
    } catch (error) {
        res.status(500).send({status: "Error", message: error.messages})
    }
})

viewsRouter.get("/products", async(req, res) => {
    try {
        const data = await Product.paginate({})
        console.log(data.docs)
        res.render("realTimeProducts", data)
    } catch (error) {
        res.send(error.message)
    }
})

export default viewsRouter