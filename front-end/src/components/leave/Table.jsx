import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import axios from "axios";
import { LeaveButtons } from "../../utils/LeaveHelper";
const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        const data = await response.data.leaves.map((leave, index) => ({
          sno: index + 1,
          _id: leave._id,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave?.employeeId?.department?.dep_name || "N/A",
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        console.log("Formatted Data:", data); // Debugging line
        console.log("Columns:", columns);
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error("Error adding department:", error);
      if (error && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  const filterByInput = (e) => {
    const data = leaves.filter((leaves) =>
      leaves.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leaves) =>
      leaves.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="px-6 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-2">
              <button className="px-2 py-1 text-white bg-teal-600 hover:bg-teal-700"
              onClick={()=>filterByButton("Pending")}>
                Pending
              </button>
              <button className="px-2 py-1 text-white bg-teal-600 hover:bg-teal-700"
              onClick={()=>filterByButton("Approved")}
              >
                Approved
              </button>
              <button className="px-2 py-1 text-white bg-teal-600 hover:bg-teal-700"
               onClick={()=>filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div> Loading..</div>
      )}
    </>
  );
};

export default Table;
