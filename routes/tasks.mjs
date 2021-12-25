import express from 'express';
import {getAllTask, getTask, createTask, updateTask, deleteTask} from '../controllers/tasks.mjs';
const router = express.Router();


router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default router