import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {  getAttendance, getAttendanceReport, updateAttendance } from "../controller/attendanceController.js";
import defaultAttendance from "../middleware/defaultAttendance.js";
const router=express.Router();

router.get("/",authMiddleware,defaultAttendance, getAttendance);
router.put("/update/:employeeId",authMiddleware,defaultAttendance,updateAttendance);
router.get("/report",authMiddleware,defaultAttendance, getAttendanceReport);
export default router;