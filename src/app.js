import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/db.js"
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import {Server} from "socket.io"
import http from "http"

//
const app = express()
app.use(express.static("public"))

///
const server =http.createServer(app)
const io = new Server(server)
const PORT = 8081
app.use(express.json())

dotenv.config()

//HandleBars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

connectMongoDB()

//Endpoits
app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

//Websocket
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")
})

server.listen(PORT, () => {
    console.log(`Server online in port : http://localhost:${PORT} `)
})