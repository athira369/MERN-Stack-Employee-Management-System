import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `https://mern-stack-employee-management-system.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
            setLeave(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
        if (error && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);
  const changeStatus = async (id,status) =>{
     try {
        const response = await axios.put(
          `https://mern-stack-employee-management-system.vercel.app/api/leave/${id}`,{status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          navigate("/admin-dashboard/leaves")
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
        if (error && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
  }
  return (
    <>{leave?(
    <div className="max-w-4xL max-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={`https://mern-stack-employee-management-system.vercel.app/${leave.employeeId.userId.image}`}
            className="rounded-full border w-72"
            alt=""
          />
        </div>
        <div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">LeaveType:</p>
                <p className="font-medium">{leave.leaveType}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>

            </div>
           
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{leave.employeeId.department.dep_name}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>

            </div>
            <div className=" flex  space-x-3 mb-5">
                <p className="text-lg font-bold">{leave.status === "Pending"? "Action:": "Status:"}</p>
                {leave.status === "Pending"?(
                    <div className=" flex  space-x-3 mb-5">
                        <button className=" px-2 py-0.5 bg-teal-300 hover:bg-teal-400"
                        onClick={()=>changeStatus(leave._id,"Approved")}
                        >Approve</button>
                        <button className="px-2 py-0.5 bg-red-300 hover:bg-teal-400"
                          onClick={()=>changeStatus(leave._id,"Rejected")}
                        > Reject</button>
                        </div>
                ):
                <p className="font-medium">{leave.status}
                </p>
}
            </div>
        </div>
      </div>
    </div>
    ):<div>
        Loading...</div>}</>
  );
};

export default Detail;
