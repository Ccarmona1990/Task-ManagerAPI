import {task, completedTask, userTasks} from "../models/task.mjs";

export const getAllUserTask = async (req, res)=>{
    const username = req.params.username;
    try {
        const currentLoggedUser = await userTasks.find({username});
        
        if(currentLoggedUser){
            const tasks = currentLoggedUser[0].tasks;
            const completedtasks = currentLoggedUser[0]?.completedtasks;
            res.status(200).json({
                tasks: tasks ? tasks : [], 
                completedtasks: completedtasks ? completedtasks : []})
        }

    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
};

export const getUserTask = async (req, res)=>{
    const {id, username} = req.params;

    if(username && id){
        try {
            const currentLoggedUser = await userTasks.findOne({username});

            const currUserTask = currentLoggedUser?.tasks?.filter((task)=>{
                if(task._id == id){
                    return task
                }
            })
            const currUserCompletedTask = currentLoggedUser?.completedtasks?.filter((cTask)=>{
                if(cTask._id == id){
                    return cTask
                }
            })
            res.status(200).json({currUserTask, currUserCompletedTask})

            if(!currentTask && !currUserCompletedTask){
                return res.status(404).json({msg:`No task with id: ${id}`})
            }
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        }
    }
};
export const getUser = async (req, res)=>{
    const credential = req.params.credential;

    const username = await userTasks.findOne({username: credential})
    const email = await userTasks.findOne({email: credential})
    res.status(200).json({
        success: true, 
        currentUser: username ? username : email
    })
}

export const createUser = async (req, res)=>{
    const newUser = req.body; 
    try {
        const newUserInfo = await userTasks.create(newUser);
        res.status(201).json({success: true, msg: 'The user was successfully created!'})
        
    } catch (error) {
        const {message} = error;
            res.status(500).json({msg: message, success: false})
    }
};

export const loginUser = async (req, res)=>{
    const username = req.body;
    
    try {
        const currentLoggedUser = await userTasks.find({username});
        res.status(200).json({success: true, msg: 'User has logged in'})
    } catch(err){
        const {message} = error;
            res.status(500).json({msg: message, success: false})
    }
}

export const createUserTask = async (req, res)=>{
    const UserTaskInfo = req.body;
    const newTaskInfo = req.body?.tasks[0];
    const currentUser = req.body?.username;
    
    console.log(UserTaskInfo);
    if(newTaskInfo?.isTaskCompleted){
        try{
            const newUserTaskInfo = await userTasks.findOneAndUpdate({username: currentUser}, {username: currentUser, $push: {tasks: newTaskInfo}}, {returnDocument: 'after', overwrite: false});
            if(newUserTaskInfo){
                return res.status(201).json({newUserTaskInfo});
            } else if (!newUserTaskInfo) {
                return res.status(404).json({msg:`User: ${currentUser} not found in the database.`})
            }
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        } 
    } else {
        try {
            const newUserTaskInfo = await userTasks.findOneAndUpdate({username: currentUser}, {username: currentUser, $push: {tasks: newTaskInfo}}, {returnDocument: 'after', overwrite: false});

            if(newUserTaskInfo){
                return res.status(201).json({newUserTaskInfo});
            } else if (!newUserTaskInfo) {
                return res.status(404).json({msg:`User: ${currentUser} not found in the database.`})
            }
        } catch (error) {
            const {message} = error;
            res.status(500).json({msg: message, success: false})
        }
    }
};

