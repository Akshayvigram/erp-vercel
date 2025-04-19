import Attendance from "../models/Attendance.js";


const getAttendance=async(req,res)=>{

    
    try {
        const date = new Date().toISOString().split('T')[0];

        const existingAttendance = await Attendance.findOne({date}).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        });

        res.status(200).json({success: true, existingAttendance})
    }catch(error){
        res.status(500).json({success: false, error: "get attendance server error"})
    }
}

const updateAttendance = async (req, res) => {
    try {
        const { status, employeeId } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const existingAttendance = await Attendance.findOne({ employeeId: employeeId, date: date });
        
        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            res.status(200).json({ success: true, message: 'Attendance updated successfully' });

        } else {
            const newAttendance = new Attendance({
                employeeId,
                date,
                status,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newAttendance.save();
            res.status(200).json({ success: true, message: 'Attendance created successfully' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "update attendance server error" });
    }
}

const getAttendanceReport = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const existingAttendance = await Attendance.findOne({date}).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        });
        const groupData = existingAttendance.reduce((result, record) => {
            if(!result[record.date]){
                result[record.date] = [];
            }
            result[record.date].push(record);
            return result;
        }, {});

        res.status(200).json({success: true, existingAttendance})
    }catch(error){
        res.status(500).json({success: false, error: "get attendance server error"})
        
    }
}
export {  getAttendance, getAttendanceReport, updateAttendance };

