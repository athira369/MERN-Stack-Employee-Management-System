import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const List = () => {
 
  const [leaves, setLeaves] = useState(null);
   const [filteredLeaves, setFilteredLeaves] = useState([]);
  let sno =1;
  const {id} = useParams();
  const {user} = useAuth();
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `https://mern-stack-employee-management-system.vercel.app/api/leave/${id}/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data)
        if (response.data.success) {
          setLeaves(response.data.leave);
           setFilteredLeaves(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
        if (error?.response?.data?.error) {
          alert(error.response.data.error);
        }
      }
    };
    

    fetchLeaves();
  }, []);
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.leaveType.toLowerCase().includes(value)
    );
    setFilteredLeaves(filtered);
  };
  if(!leaves)
  {
   return  <div>loadding</div>
  }
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-6 py-0.5 border"
          onChange={handleFilter}
        />

        { user.role === "employee" &&(
        <Link
          to="/employee-dashboard/add-leaves"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
        )}
      </div>

      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">S.No</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">discriptions</th>

            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave) => (
            <tr
              key={leave._id}
              className="bg-white border-b dark:bg-gray-800 dark:text-white"
            >
              <td className="px-6 py-4">{sno++}</td>
              <td className="px-6 py-4">{leave.leaveType}</td>
              <td className="px-6 py-4">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{leave.reason}</td>
              <td className="px-6 py-4">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
