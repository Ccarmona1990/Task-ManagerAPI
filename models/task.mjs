import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    task:{
        type:String, 
        trim: true,
        sparse: true,
        maxlength:[20, 'name can not be more than 20 characters']
    },
    timeStamp:{
        type:String,
        trim: true
    },
    isTaskCompleted:{
        type: Boolean,
        default:false
    },
    username:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    tasks:{ 
        type: [TaskSchema],
        default: undefined,
        sparse: true
    }, 
    completedTasks: { 
        type: [TaskSchema],
        default: undefined,
        sparse: true
    }
})
export const userTasks = mongoose.model('UserTasks', UserSchema)
export const task = mongoose.model('Task',TaskSchema)
export const completedTask = mongoose.model('CompletedTask',TaskSchema) 