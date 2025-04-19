import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV_VARS } from './db/envVars.js';
import authRoutes from "./routes/auth.route.js";
import departmentRoutes from "./routes/department.js";
import { connectToDataBase } from './db/db.js';
import employeeRouter from "./routes/employee.js";
import leaveRouter from './routes/leave.js';
import settingRoute from './routes/setting.js';
import attendanceRoute from './routes/attendance.js';
import dashboardRouter from './routes/dashboard.js';
import SalaryRouter from "./routes/salary.js";



const app = express();

// For __dirname usage in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files

// CORS configuration
app.use(cors())

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
app.use(express.static(path.join(__dirname, 'public/uploads')));

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Catch-all route for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

// Start server
const PORT = ENV_VARS.PORT || 5000;
app.listen(PORT, () => {
  connectToDataBase();
  console.log(`✅ Server running on ${PORT}`);
});
