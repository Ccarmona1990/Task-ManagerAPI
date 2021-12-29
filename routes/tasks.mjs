import express from 'express';
import {getAllTask,createTask, updateTask, deleteTask} from '../controllers/tasks.mjs';
const router = express.Router();

router.route('/').post(createTask);
router.route('/:id').patch(updateTask).delete(deleteTask);
router.route('/:username').get(getAllTask);

export default router