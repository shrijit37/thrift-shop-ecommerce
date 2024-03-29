import express from "express";
import {createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile
}  from "../controller/userController.js";

import { authenticate,authorizeAdmin } from "../controller/authMiddleware.js";

const router = express.Router();


router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);




export default router;