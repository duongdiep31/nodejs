import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import {readdirSync} from 'fs'
require('dotenv').config();
const app = express();
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL ,{useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("connect db successfully");
})
.catch(() => {
    console.log("error");
})
// middleware
app.use(morgan("tiny"))
app.use(express.json());
app.use(cors());
//router
readdirSync('./routes').map(route => app.use("/api",require(`./routes/${route}`)))
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log('server is running port ',port);
})