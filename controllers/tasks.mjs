import {task, completedTask} from "../models/task.mjs";

export const getAllTask = async (req, res)=>{
    try {
        const tasks = await task.find({});
        const completedtasks = await completedTask.find({})
        res.status(200).json({tasks, completedtasks})
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
};

export const getTask = async (req, res)=>{
    const id = req.params.id;
    try {
        const currentTask = await task.findOne({_id: id}).exec();
        const currentCompletedTask = await completedTask.findOne({_id: id}).exec();
        if(currentTask || currentCompletedTask){
            return res.status(200).json({currentTask, currentCompletedTask})
        } 
        if(!currentTask && !currentCompletedTask){
            return res.status(404).json({msg:`No task with id: ${id}`})
        }
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
};
export const createTask = async (req, res)=>{
    const newCurrentTask = req.body;
    
    if(newCurrentTask?.isTaskCompleted){
        try {
            const nTask = await completedTask.create(newCurrentTask)
            res.status(201).json({nTask});
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        }
    } else {
        try {
            const nTask = await task.create(newCurrentTask)
            res.status(201).json({nTask});
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        }
    }
}; 
export const updateTask = async (req, res)=>{
    const update = req.body;
    const id = req.params.id;
        try {
            const currentTask = await task.findOneAndUpdate({_id: id}, update, {returnDocument: 'after'});
            const currentCompletedTask = await completedTask.findOneAndUpdate({_id: id}, update,{returnDocument: 'after'});
    
            res.status(200).json({currentTask, currentCompletedTask})
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        }
    
}; 
export const deleteTask = async (req, res)=>{
    try {
        const id = req.params.id;
        const currentTask = await task.findOneAndDelete({_id: id});
        const currentCompletedTask = await completedTask.findOneAndDelete({_id: id});

        if(currentTask){
            return res.status(200).json({currentTask})
        } else if (currentCompletedTask){
            return res.status(200).json({ currentCompletedTask})
        }
        if(!currentTask && !currentCompletedTask){
            return res.status(404).json({msg:`No task with id: ${id}`})
        }
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
};

