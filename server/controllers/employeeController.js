import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Department from "../models/Department.js";

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      image: req.file ? req.file.filename : null, // ✅ Fix: Extract file safely
    });

    console.log("Saving User to MongoDB:", newUser);
    const savedUser = await newUser.save();
    console.log("Saved User in MongoDB:", savedUser);

    // Create new employee
    const newEmployee = new Employee({
      userId: savedUser._id, // ✅ Fix: Now `savedUser` is properly assigned
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    console.log("Employee Saved:", newEmployee);

    return res
      .status(201)
      .json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employee server error" });
  }
};
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      if(!employee)
        {
        employee=  await Employee.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");

      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employee server error" });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    const updateUser = await User.findByIdAndUpdate({ _id: employee.userId });
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        department,
        salary,
      }
    );
    if (!updateUser || !updateEmployee) {
      return res
        .status(404)
        .json({ success: false, error: "document not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "employee updated successfully" });
  
  } 
  catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employee server error" });
  }
};
const fetchEmployeesByDepId = async(req,res) =>{
  const { id } = req.params;
  try {
    const employees = await Employee.find({department: id })
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employeebyDepId server error" });
  }
};




export { addEmployee, upload, getEmployees, getEmployee, updateEmployee ,fetchEmployeesByDepId};
