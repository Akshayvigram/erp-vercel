import Salary from "../models/Salary.js";
import Employee from '../models/Employee.js'

export const addSalary=async(req,res)=>{
    try {
        const{employeeId,basicSalary,allowances,deductions,payDate}=req.body;
        const totalSalary=parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions);
        const salary=new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate
        })
        await salary.save();
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false,error:"salary not added"})
    }
}

export const getSalary = async(req, res) => {
    try {
        const {id, role} = req.params;
        console.log(id);
        console.log(role);
        
        
        const userRole = role; 
        
        let salary;
        if (userRole === 'employee') {
            // Employee flow
            salary = await Salary.find({employeeId: id})
                .populate('employeeId', 'employeeId');
                
            if (!salary || salary.length < 1) {
                const employee = await Employee.findOne({userId: id});
                if (!employee) {
                    return res.status(404).json({success: false, error: "Employee not found"});
                }
            }
        } else if (userRole === 'admin') {
            salary = await Salary.find({employeeId: id})
                .populate({
                    path: 'employeeId',
                    select: 'employeeId userId',
                    populate: {
                        path: 'userId',
                        select: 'name'
                    }
                });
                console.log(salary);
                
            if (!salary || salary.length < 1) {
                return res.status(404).json({success: false, error: "No salary records found for this employee"});
            }
        } else {
            return res.status(403).json({success: false, error: "Unauthorized access"});
        }

        return res.status(200).json({success: true, salary});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, error: "Internal server error"});
    }
}