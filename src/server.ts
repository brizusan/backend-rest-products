import express from "express";
import colors from "colors"
import cors,{CorsOptions} from "cors"
import morgan from "morgan"
import routerProducts from "./router"
import db from "./config/db"


async function connectDB() {
  try {
    await db.authenticate();
    await db.sync()
    console.log(colors.bgGreen.bold('Conectado a la base de datos'))
  } catch (error) {
    console.log(error)
    console.log(colors.bgRed.bold('Error al conectar con la base de datos'))
  }
}

connectDB()

const server = express();
// Configurar cors
const corsOptions : CorsOptions = {
  origin: function (origin, callback) {
    if (origin === `${process.env.FRONTEND_URL}` || `${process.env.LOCAL_URL}`)  {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

// Habilitar cors
server.use(cors(corsOptions))
// Habilitar lectura de datos en formato json
server.use(express.json());
server.use(morgan('dev'))
server.use("/api/products", routerProducts);

//Routing

export default server;

