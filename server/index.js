import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.route.js";
import departmentRoutes from "./routes/department.js";
import { connectToDataBase } from './db/db.js';
import employeeRouter from "./routes/employee.js";
import leaveRouter from './routes/leave.js';
import settingRoute from './routes/setting.js';
import attendanceRoute from './routes/attendance.js';
import dashboardRouter from './routes/dashboard.js';
import SalaryRouter from "./routes/salary.js";

dotenv.config();

const app = express();

// For __dirname usage in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, 'public/uploads')));

// CORS configuration
app.use(cors({
  origin: 'https://azhizen-erp.vercel.app', // Your frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", SalaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/dashboard", dashboardRouter);

// Fallback for non-API routes (optional)
app.get('*', (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDataBase();
  console.log(`✅ Server running on ${PORT}`);
});
