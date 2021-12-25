import express from "express";
import greetingRoute from "./routes/greeting.mjs"
import taskRoute from './routes/tasks.mjs';
import DBconnection from './db/connect.mjs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const URI = process.env.MONGO_URI;

// form parse
app.use(express.urlencoded({extended:false}))
// json parse
app.use(express.json()) 
// routes
app.use('/', greetingRoute)
app.use('/api/v1/tasks', taskRoute);

const start = async ()=>{
    try {
        await DBconnection(URI)
        app.listen(port, ()=>console.log(`Server open on port: ${port}`))
    } catch (err) {
        console.log(err);
    }
}

start();



