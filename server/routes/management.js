import express from 'express';
import { getAdmins } from '../controllers/management.js';
import { getUserPerformance } from '../controllers/management.js'

const router = express.Router();

router.route('/admin').get(getAdmins);
router.route('/performance/:id').get(getUserPerformance)

export default router;
