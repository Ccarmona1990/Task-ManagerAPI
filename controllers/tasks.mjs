import {task, completedTask, userTasks} from "../models/task.mjs";

export const getAllTask = async (req, res)=>{
    const username = req.params.username;
    try {
        const currentLoggedUser = await userTasks.findOne({username});
        const currentLoggedEmail = await userTasks.findOne({email: username});

        if(currentLoggedUser){
            const tasks = await task.find({username});
            const completedtasks = await completedTask.find({username})
            res.status(200).json({tasks, completedtasks})
        } else if(currentLoggedEmail){
            const tasks = await task.find({email: username});
            const completedtasks = await completedTask.find({email: username})
            res.status(200).json({tasks, completedtasks})
        }
        if (!currentLoggedUser) {
                if(!currentLoggedEmail){
                    return res.status(404).json({msg:`User was not found in the database.`})
                }
            }

    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
};

export const getTask = async (req, res)=>{
    const id = req.params.id;
    if(id){
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
    }
};

export const createTask = async (req, res)=>{
    const newTaskInfo = req.body;
    const currentUser = req.body.username;
    const currentEmail = req.body.email;
    
    if(newTaskInfo?.isTaskCompleted){
        try{
            const currentLoggedUser = await userTasks.findOne({username: currentUser});
            const currentLoggedEmail = await userTasks.findOne({email: currentEmail});
            if(currentLoggedUser || currentLoggedEmail){
                const newTask = await completedTask.create(newTaskInfo);
                res.status(201).json({success: true, msg: 'Task was successfully created!'});
            } else if (!currentLoggedUser) {
                if(!currentLoggedEmail){
                    return res.status(404).json({msg:`User: ${currentUser} not found in the database.`})
                }
            }
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        } 
    } else {
        try {
            const currentLoggedUser = await userTasks.findOne({username: currentUser});
            const currentLoggedEmail = await userTasks.findOne({email: currentEmail});
            if(currentLoggedUser|| currentLoggedEmail){
                const newTask = await task.create(newTaskInfo);
                res.status(201).json({success: true, msg: 'Task was successfully created!'});
            } else if (!currentLoggedUser) {
                if (!currentLoggedEmail){
                    return res.status(404).json({msg:`User was not found in the database.`})
                }
            }
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
    
            res.status(200).json({
                currentTask: currentTask? currentTask: null, currentCompletedTask: currentCompletedTask? currentCompletedTask: null})
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
            return res.status(200).json({success: true, msg: 'Task successfully deleted'})
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

