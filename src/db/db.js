import mongoose from "mongoose"

const connectMongoDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://codder:coder1221@ecommerce-cluster.um4wg.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=ecommerce-cluster")
        console.log("Conectado con mongoDB")
    } catch (error) {
        console.log("Error al conectar con mongoBD")
    }
}

export default connectMongoDB