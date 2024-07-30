import Router from "express";
const route = Router();
import {CreateNewUser}from '../controllers/UserCtrl.js'
route.post('/api',CreateNewUser,(req,res)=>{
    
})
export default route