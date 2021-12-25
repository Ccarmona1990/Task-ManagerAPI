import mongoose from 'mongoose';

const DBconnection = (url) =>{
    return mongoose
    .connect(url)
    .then(()=>console.log('DB CONNECTION OPEN...'))
}
export default DBconnection