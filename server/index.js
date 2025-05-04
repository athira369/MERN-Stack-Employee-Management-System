import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectToDatabase from './db/db.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from "./routes/leave.js";
import settingRouter from './routes/setting.js';
import attendanceRouter from './routes/attendance.js';
import dashboardRouter from './routes/dashboard.js';
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware (ORDER MATTERS)
app.use(cors({
    origin:["https://mern-stack-employee-management-system-pf8b.vercel.app"],
    credentials:true,
}));
app.use(express.json()); // ✅ Parse JSON before defining routes
app.use(express.urlencoded({ extended: true })); // ✅ Support form data
app.use(express.static('public/upload'))
// Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary',salaryRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/settings',settingRouter);
app.use('/api/attendance',attendanceRouter);
app.use('/api/dashboard',dashboardRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
