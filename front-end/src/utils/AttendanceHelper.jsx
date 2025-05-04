import axios from "axios";
import React from "react";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: " Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: " Emp Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "130px",
  },

  {
    name: " Department",
    selector: (row) => row.department,
    sortable: true,
    width: "120px",
  },

  {
    name: "Action",
    cell: (row) => row.actions,
    center: "true",
  },
];
export const AttendanceHelper = ({ status, employeeId ,statusChange}) => {
  const markEmployee = async ({ status, employeeId })=>{
    const response = await axios.put(
      `https://mern-stack-employee-management-system.vercel.app/api/attendance/update/${employeeId}`,{status},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(response.data.success)
    {
      statusChange();
    }
  }
  return (
    <div className="p-2">
      {status == null ? (
        <div className="flex space-x-8">
          <button
            className="px-4 py-2 bg-green-500 text-white"
            onClick={() => markEmployee({status:"present", employeeId})}
          >
            Present
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white"
            onClick={() => markEmployee({status:"absent", employeeId})}
          >
            Absent
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white"
            onClick={() => markEmployee({status:"leave", employeeId})}
          >
            Leave
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white"
            onClick={() => markEmployee({status:"sick", employeeId})}
          >
            Sick
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};
