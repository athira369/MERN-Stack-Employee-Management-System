import mongoose from "mongoose";
import { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    enum: ["Present", "Sick", "Absent", "Leave"], // Restrict marital status values
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
