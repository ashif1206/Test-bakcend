import express from 'express';
import cookieParser from 'cookie-parser'
import   'dotenv/config'
import connectDB from './config/db.js';
import contactRoute from './router/contactRoutes.js';
import cors from 'cors'

const app = express();

const port = process.env.PORT;
app.use(cors("*"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/v1",contactRoute)

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port http://localhost:${port}`)
});
