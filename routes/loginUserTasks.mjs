import express from 'express';
import {loginUser} from '../controllers/usertasks.mjs';
const router = express.Router();

router.route('/').post(loginUser)

export default router