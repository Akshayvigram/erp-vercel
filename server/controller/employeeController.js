import User from "../models/User.js"
import Employee from "../models/Employee.js"
import bcrypt from "bcrypt";
import multer, { diskStorage } from "multer";
import path from "path";
import Department from "../models/Department.js";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"server/public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

export const upload=multer({storage:storage})

export const addEmployee=async(req,res)=>{
    try {
        const{
            name,email,employeeId,dob,gender,maritalStatus,designation,department,password,role
        }=req.body;
        
       
        
        const user=await User.findOne({email})
        console.log(user);
        
        if(user){
            return res.status(400).json({success:false,error:"user already exists"});
        
        }
        const hashedPass=await bcrypt.hash(password,10);
        const newUser=new User({
            name,email,password:hashedPass,
            role,
            profileImage:req.file?req.file.filename:"",
        })
        console.log("here 2");
        
        const savedUser=await newUser.save();
        
            const newEmployee=new Employee({
                userId:savedUser._id,
                employeeId,
                dob,gender,
                maritalStatus,
                designation,
                department,
                
            })
        
            
            await newEmployee.save();
            return res.status(200).json({success:true,message:"employee created"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:"server error in creating employee"})
    }

}

export const getEmployees=async(req,res)=>{
    try{
        const employees = await Employee.find().populate('userId',{password:0}).populate('department')
        return res.status(200).json({success: true, employees})
    }catch(error){
        return res.status(500).json({success: false, error: "get employee server error"})
    }
}

export const getEmployee=async(req,res)=>{
    const{id}=req.params;
    
    try{
        let employee;
        employee = await Employee.findById({_id:id}).populate('userId',{password:0}).populate('department');
        if(!employee) {
            employee = await Employee.findOne({userId:id}).populate('userId',{password:0}).populate('department');
        }
        
        return res.status(200).json({success: true, employee})
    }catch(error){
        return res.status(500).json({success: false, error: "get employee server error"})
    }
}


export const updateEmployee=async(req,res)=>{
    try {
       const {id}=req.params;
        const{name,maritalStatus,designation,department,salary}=req.body;
        const employee=await Employee.findById({_id:id})
        if(!employee){
            return res.status(400).json({success: false, error: " no employee found"})
        }
        const user=await User.findById({_id:employee.userId})
        if(!user){
            return res.status(400).json({success: false, error: " no user found"})
        }
        const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name});
        const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
            maritalStatus,
            designation,salary,department
        })
        if(!updateUser||!updateEmployee){
            return res.status(400).json({success: false, error: "document not found "})
        }
        return res.status(200).json({success:true,message:"updated details"});
    } catch (error) {
        return res.status(500).json({success: false, error: "update employee server error"})
    }
}

export const fetchEmployeesByDepId=async(req,res)=>{
    const{id}=req.params;
    
    try{
        const employees = await Employee.find({department:id}).populate('userId',{password:0}).populate('department')
        
        return res.status(200).json({success: true, employees})
    }catch(error){
        return res.status(500).json({success: false, error: "get employee by department id server error"})
    }
}