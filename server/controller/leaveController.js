import path from "path";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js ";
import mongoose from "mongoose";
export const addLeave = async(req ,res ) => {
    try {
            const{userId,leaveType,startDate,endDate,reason}=req.body;
            const employee = await Employee.findOne({userId})
            console.log("leave")

            const newLeave = new Leave({
                employeeId: employee._id, leaveType,startDate,endDate,reason
            })
            await newLeave.save();
            return res.status(200).json({success:true})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({success:false, error:"leave add server error"})
        }

    }

    export const getLeave = async (req, res) => {
        try {
            const { id, role } = req.params;
            let leaves
            if(role === "admin") {
                leaves = await Leave.find({ employeeId: id });
            } else {
                const employee = await Employee.findOne({ userId: id });
                leaves = await Leave.find({ employeeId: employee._id });
            }
    
            return res.status(200).json({ success: true, leaves });
        } catch (error) {
            console.log(error.message);
            console.log("Error in getLeave");
    
            return res.status(500).json({ success: false, error: "leave add server error" });
        }
    };
    
export const getLeaves = async (req, res) => {
        try{
            
            
            const leaves = await Leave.find().populate({
                path: "employeeId",
                populate:[
                    {
                        path: 'department',
                        select: 'dep_name'
                    },
                    {
                        path: 'userId',
                        select:'name'
                    }
                ]
            })
            
            console.log(leaves);
            
            console.log("here");
            return res.status(200).json({success: true, leaves})
        } catch(error) {
            console.log("error in getleaves");

            console.log(error.message)

            return res.status(500).json({success: false, error: "leave add server error"})
        }
    }

export const getLeaveDetail = async (req, res) => {
        try{
            const {id} = req.params;
            const leave = await Leave.findById({_id: id}).populate({
                path: "employeeId",
                populate:[
                    {
                        path: 'department',
                        select: 'dep_name'
                    },
                    {
                        path: 'userId',
                        select:'name profileImage'
                    }
                ]
            })

            return res.status(200).json({success: true, leave})
        } catch(error) {
            console.log(error.message)
            console.log("error in getleave detail");
            
            return res.status(500).json({success: false, error: "leave detail server error"})
        }
    }

 export   const updateLeave = async(req, res) => {
        try {
            console.log(req.body.status);
            
            const {id} = req.params;
            const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
            if(!leave) {
                return res.status(404).json({success: false, error: "leave not founded"})
            }
            return res.status(200).json({success: true})
        } catch(error) {
            console.log(error.message)
            return res.status(500).json({success: false, error: "leave update server error"})
        }
    }
    