import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    task:{
        type:String, 
        required:[true, 'Please provide a name'],
        trim: true,
        maxlength:[20, 'name can not be more than 20 characters']
    },
    timeStamp:{
        type:String,
        trim: true
    },
    isTaskCompleted:{
        type: Boolean,
        default:false
    }
})

export const task = mongoose.model('Task',TaskSchema)
export const completedTask = mongoose.model('CompletedTask',TaskSchema)