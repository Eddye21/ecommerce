import express from "express"
import connectMongoDB from "./db/db.js"
import { engine } from "express-handlebars"
import productRouter from "./routes/product.routes.js"
import viewsRouter from "./routes/views.routes.js"

const app = express()
const PORT = 8081
app.use(express.json())

//HandleBars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

connectMongoDB()

//Endpoits
app.use("/products", viewsRouter)
app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log(`Server online in port : http://localhost:${PORT} `)
})