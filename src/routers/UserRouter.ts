import { Router } from "express";
import { createProfile, getProfile, registerUser } from "../Controllers/UserController";

const userRouter = Router();

userRouter.post('/register',registerUser);
 userRouter.get('/profile', getProfile);
 userRouter.post('/createprofile', createProfile);
// userRouter.put('/update-profile');
// userRouter.get('/friends');
// userRouter.get('/friend-requests');
// userRouter.post('/send-friend-request');
// userRouter.post('/accept-friend-request');
// userRouter.post('/reject-friend-request');
// userRouter.delete('/remove-friend');





export default userRouter;
