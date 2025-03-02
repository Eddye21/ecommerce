import express from "express"
import connectMongoDB from "./db/db.js"
import dotenv from "dotenv"
import { engine } from "express-handlebars"
import productRouter from "./routes/product.routes.js"
import viewsRouter from "./routes/views.routes.js"

dotenv.config()

const app = express()
const PORT = 8081
app.use(express.json())

//HandleBars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

connectMongoDB()

//Endpoits
app.use("/", viewsRouter)
app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log(`Server online in port : http://localhost:${PORT} `)
})