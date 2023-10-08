import express from 'express';
import { storeUserInformation, getUserHistory } from '../controllers/userInfo.js'


const router = express.Router();

router.post("/user-info", storeUserInformation);
router.get("/history", getUserHistory);

export default router;