import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
const Attendance = () => {
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const statusChange = () => {
    fetchAttendance();
  };
  const fetchAttendance = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get("https://mern-stack-employee-management-system.vercel.app/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     
      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          actions: (
            <AttendanceHelper
              status={att.status}
              employeeId={att.employeeId.employeeId}
              statusChange={statusChange}
            />
          ),
        }));
        // console.log("Formatted Data:", data); // Debugging line
        // console.log("Columns:", columns);
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error("Error adding attendance:", error);
      if (error && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, []);
  const handleFilter = (e) => {
    const records = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  // console.log("Rendering with departments:", employees);
  // console.log("Rendering with columns:", columns);
  return (
    <>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <div>
          <div className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Manage Attendance</h3>
            </div>
            <div className="flex justify-between items-center mt-4">
              <input
                type="text"
                placeholder="Search By Department Name"
                className="px-6 py-0.5 border"
                onChange={handleFilter}
              />
              <p className="text-2xl">
                Mark Employees for{" "}
                <span className=" font-bold underline">
                  {new Date().toISOString().split("T")[0]}
                  {""}
                </span>
              </p>
              <Link
                to="/admin-dashboard/attendance-report"
                className="px-4 py-1 bg-teal-600 rounded text-white"
              >
                Attendance Reporter
              </Link>
            </div>
          </div>
          <div>
            <DataTable columns={columns} data={filteredAttendance} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
