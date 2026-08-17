import {Router} from 'express';
import {deleteAccount, loginUser, registerUser, updateProfile} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.patch("/profile", updateProfile);

router.delete("/account", deleteAccount);

export default router;