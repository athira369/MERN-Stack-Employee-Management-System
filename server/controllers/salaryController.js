import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";
const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowance, deductions, PayDate } =
      req.body;

    if (!employeeId || !basicSalary || !allowance || !deductions || !PayDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const salary = parseFloat(basicSalary) + parseFloat(allowance);
    const netSalary = salary - parseFloat(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowance,
      deductions,
      salary,
      netSalary,
      PayDate,
    });

    await newSalary.save();

    return res
      .status(200)
      .json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("Error in addSalary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getSalary = async (req, res) => {
  try {
    const { id,role } = req.params;
    console.log("role:", role);
    let salary;
   if(role === "admin")
   {
    salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
  }else
    
    {
     const  employee = await Employee.findOne({userId:id});
     if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
     salary = await Salary.find({employeeId:employee._id}).populate(  "employeeId",
      "employeeId");
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("Error in Salary get:", error);
    return res
      .status(500)
      .json({ error: "Internal server error Salary get error" });
  }
};

export { addSalary, getSalary };
