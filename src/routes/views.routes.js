import express from "express"
import Product from "../models/products.model.js"

const viewsRouter = express ()

viewsRouter.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3
        const sortOrder = parseInt(req.query.sort, 10) || 1 

        const sort = { stock: sortOrder }

        const listProducts = await Product.paginate({}, { page, limit, sort, lean: true,})
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

viewsRouter.get('/ordenar', async (req, res) => {
    try {
        const resultados = await collection.find().sort({ stock: -1 }).toArray()

        res.render('home', { datos: resultados })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error en el servidor')
    }
});


export default viewsRouter