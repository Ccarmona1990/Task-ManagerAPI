import express from "express";
import greetingRoute from "./routes/greeting.mjs"
import taskRoute from './routes/tasks.mjs';
import DBconnection from './db/connect.mjs';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();
const port = process.env.PORT;
const URI = process.env.MONGO_URI;

// form parse
app.use(express.urlencoded({extended:false}))
// json parse
app.use(express.json())

// routes
app.use('/', greetingRoute)
app.use('/api/v1/tasks', taskRoute);

// http request logger
app.use(morgan('tiny'))

const start = async ()=>{
    try {
        await DBconnection(URI)
        app.listen(port)
    } catch (err) {
        console.log(err);
    }
}

start();



