import express from 'express';
import {getGreeting} from '../controllers/greeting.mjs';
const router = express.Router();

router.get('/',getGreeting);

export default router