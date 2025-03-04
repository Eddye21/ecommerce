import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/db.js"
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import {Server} from "socket.io"
import http from "http"

dotenv.config()

//Settings server
const PORT = 8081
const app = express()
const server =http.createServer(app)
const io = new Server(server)
app.use(express.json())
app.use(express.static("public"))

//HandleBars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Connect MongoDB
connectMongoDB()

//Endpoits
app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

//Websocket
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")
})

//Listen server
server.listen(PORT, () => {
    console.log(`Server online in port : http://localhost:${PORT} `)
})