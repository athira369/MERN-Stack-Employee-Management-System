import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `https://mern-stack-employee-management-system.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        if (error && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployees();
  }, [id]);
  return (
    <>{employee?(
    <div className="max-w-4xL max-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={`https://mern-stack-employee-management-system.vercel.app/${employee.userId.image}`}
            className="rounded-full border w-72"
            alt=""
          />
        </div>
        <div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{employee.employeeId}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Date oF Birth:</p>
                <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department.dep_name}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus}</p>

            </div>
        </div>
      </div>
    </div>
    ):<div>
        Loading...</div>}</>
  );
};

export default View;
