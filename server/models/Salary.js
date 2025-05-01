import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  PayDate: { type: Date, required: true },
  basicSalary: {
    type: Number,
    required: true,
  },
  netSalary:{type:Number,required:true},
  allowance: {
    type: Number,
    required: true,
  },
  deductions: { type: Number, required: true },
  salary: { type: Number, required: true }, // ✅ Fix salary type to Number
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;
