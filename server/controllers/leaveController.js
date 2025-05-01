import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const employee = await Employee.findOne({userId});

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res
      .status(200)
      .json({ success: true, message: "Leave added successfully" });
  } catch (error) {
    console.log(error.message);
    console.error("Error in addleave:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLeave  = async(req,res)=>{
  try{
    const{id,role}= req.params;
    let leave;
    if(role ==="admin")
    {
      leave = await Leave.find({employeeId:id})
    }
   
    else
    {
      const employee = await Employee.findOne({userId:id});
       leave = await Leave.find({employeeId:employee._id}) 
    }
   
    return res.status(200).json({success:true, leave})
  }
  catch (error) {
    console.log(error.message);
    console.error("Error in addleave:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getLeaves = async(req,res)=>{
  try{
    const leaves = await Leave.find({}).populate({
      path:"employeeId",
      populate:[
        {
          path:'department',
          select:'dep_name',
          
        },
        {
          path:"userId",
          select:"name"
        },
      ]
    })
 
    return res.status(200).json({success:true,leaves})
  }
  catch (error) {
    console.log(error.message);
    console.error("Error in addleave:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
const getLeaveDetail = async(req,res)=>{
  try{
    const{id}= req.params;
    const leave = await Leave.findById({_id:id}).populate({
      path:"employeeId",
      populate:[
        {
          path:'department',
          select:'dep_name',
          
        },
        {
          path:"userId",
          select:'name  image'
        },
      ]
    })
 
    return res.status(200).json({success:true,leave})
  }
  catch (error) {
    console.log(error.message);
    console.error("Error in addleave:", error);
    return res.status(500).json({ error: "leave detail server error" });
  }
}
const updateLeave = async(req,res)=>{
  try{
const {id} = req.params;
console.log(req.body.status)
const leave = await Leave.findByIdAndUpdate({_id:id},{status:req.body.status})
if (!leave){
  return res.status(404).json({success:false,error:"Leave not found"})
}
return res.status(200).json({success:true,message:"Leave status updated successfully"})
  }
  catch (error) {
    console.log(error.message);
    console.error("Error in addleave:", error);
    return res.status(500).json({ error: "Leave update  server error" });
  }
}


export { addLeave, getLeave,getLeaves,getLeaveDetail,updateLeave};
