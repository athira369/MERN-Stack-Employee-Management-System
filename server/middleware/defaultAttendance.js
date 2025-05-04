import Attendance  from "../models/Attendance.js";
import Employee from "../models/Employee.js";
const  defaultAttendance = async (req,res,next)=>
{
    try{
        const date = new Date().toISOString().split('T')[0];
const existingAttendance = await Attendance.findOne({date});
if(!existingAttendance)
{
    const employees = await Employee.find({});
    const attendance = employees.map(employee =>({date,employeeId:employee._id,status:null}));
    await Attendance.insertMany(attendance);
    console.log("Default attendance inserted for", date);
}
next();
    }catch(error){
        res.status(500).json({sucess:false,error:error.message})
    }
};
export default defaultAttendance;