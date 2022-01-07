import express from 'express';
import {createUser, getUser} from '../controllers/usertasks.mjs';
const router = express.Router();

router.route('/').post(createUser)
router.route('/:credential').get(getUser)

export default router