import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { 
    type: String, 
    enum: ["male", "female", "other"], // Restrict gender values
    required: true
  },
  maritalStatus: { 
    type: String, 
    enum: ["single", "married"], // Restrict marital status values
    required: true
  },
  designation: { type: String, required: true },
  department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  salary: { type: Number, required: true }, // ✅ Fix salary type to Number
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
