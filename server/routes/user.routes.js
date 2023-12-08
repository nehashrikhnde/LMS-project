import {Router} from "express";
import{getLoggedInUserdetails,logoutUser,registerUser,resetPassword,forgotPassword,changePassword,updateUser}from"../controller/user.controller.js";
import{isLoggedIn} from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.post('/register',upload.single("avatar"),registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/me',isLoggedIn,getLoggedInUserdetails);
router.post('/reset/:resetToken',resetPassword);
router.post('/reset',forgotPassword);
router.post('/change-password',isLoggedIn,changePassword);
router.put('/update',isLoggedIn,upload.single("avatar"),updateUser)  ;

export default  router;