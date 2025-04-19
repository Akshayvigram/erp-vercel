import User from "./models/User.js";
import bcrypt from "bcrypt";
import {connectToDataBase} from './db/db.js'
const userRegister=async()=>{
     connectToDataBase();
    try {
        const hash=await bcrypt.hash("123",10);
    const newUser=await User.create({
        name:"employee",
        email:'employee@gmail.com',
        password:hash,
        role:"employee",
        profileImage:"/image"
    })
    await newUser.save();
    console.log("created");
    
    } catch (error) {
       console.error(error);
        
    }
    
}

userRegister();