import express, {Express} from "express"
import mongoose, { connect, Connection } from "mongoose"
import path from "path"
import userRouter from "./src/routes/User"
import router from "./src/routes/index"
import morgan from "morgan"
import dotenv from "dotenv"
import cors, {CorsOptions} from 'cors'

dotenv.config()

const app: Express = express()
const PORT = 3000;

//Setting up MongoDB connection using mongoose
const mongoDB: string = "mongodb://127.0.0.1:27017"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))

//Setting up cors otpions to allow requests from frontend
const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))

//Setting up routes
app.use("/api", router)
app.use("/user", userRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

})