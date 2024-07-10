import express from 'express';
import UserInfoCtrl from './user_info.controller.js';
import LoginCtrl from './login.controller.js';

const router = express.Router();

router.route('/user')
    .get(UserInfoCtrl.apiGetUserLocation)// get user location
    .post(UserInfoCtrl.apiAddUser) // add user 
    .put(UserInfoCtrl.apiAddLocation) // add location to user 
    .delete(UserInfoCtrl.apideleteLocation) //delete location
router.route('/login')
    .post(LoginCtrl.apiLogin) //login user
export default router;
