import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/db.js"
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"

dotenv.config()

const app = express()
const PORT = 8081
app.use(express.json())

//HandleBars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

connectMongoDB()

//Endpoits
app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(PORT, () => {
    console.log(`Server online in port : http://localhost:${PORT} `)
})