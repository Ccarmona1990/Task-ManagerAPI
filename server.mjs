import express from "express";
import greetingRoute from "./routes/greeting.mjs"
import taskRoute from './routes/tasks.mjs';
import usertasksRoute from './routes/userTasks.mjs';
//import loginRoute from './routes/loginUserTasks.mjs';
import DBconnection from './db/connect.mjs';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT;
const URI = process.env.MONGO_URI;

// form parse
app.use(express.urlencoded({extended:false}))
// json parse
app.use(express.json())

// cors accessability
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PATCH", "DELETE"]
    })
);

// routes
app.use('/', greetingRoute)
app.use('/api/v1/tasks', taskRoute);
app.use('/api/v1/usertasks',usertasksRoute);
//app.use('/api/v1/login',loginRoute);

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



