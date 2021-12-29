import express from 'express';
import {createUser} from '../controllers/usertasks.mjs';
const router = express.Router();

router.route('/').post(createUser)

export default router