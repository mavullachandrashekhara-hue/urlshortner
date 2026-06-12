import { Router } from 'express';
import { loggedInUser } from '../middlewares/authMiddleware.js';
import { getUserProfile } from '../controllers/userController.js';


const userRouter = Router();


userRouter.get("/me", loggedInUser, getUserProfile);


export default userRouter;