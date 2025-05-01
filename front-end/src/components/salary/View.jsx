import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const { id } = useParams();
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  let sno = 1;
  const {user} = useAuth()

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/salary/${id}/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setSalaries(response.data.salary);
          setFilteredSalaries(response.data.salary);
        }
      } catch (error) {
        console.error("Error fetching salary:", error);
        if (error?.response?.data?.error) {
          alert(error.response.data.error);
        }
      }
    };

    fetchSalaries();
  }, [id]);

  const handleFilterSalaries = (e) => {
    const q = e.target.value;
    const filtered = salaries.filter((sal) =>
      sal.employeeId?.employeeId?.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filtered);
  };

  if (!salaries) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search By Emp-ID"
          className="border px-2 py-0.5 rounded-md border-gray-300"
          onChange={handleFilterSalaries}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Emp ID</th>
              <th className="px-6 py-3">Basic Salary</th>
              <th className="px-6 py-3">Allowance</th>
              <th className="px-6 py-3">Deductions</th>
              <th className="px-6 py-3">Net Salary</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary) => (
              <tr
                key={salary._id}
                className="bg-white border-b dark:bg-gray-800 dark:text-white"
              >
                <td className="px-6 py-4">{sno++}</td>
                <td className="px-6 py-4">{salary.employeeId?.employeeId}</td>
                <td className="px-6 py-4">{salary.basicSalary}</td>
                <td className="px-6 py-4">{salary.allowance}</td>
                <td className="px-6 py-4">{salary.deductions}</td>
                <td className="px-6 py-4">{salary.netSalary}</td>
                <td className="px-6 py-4">
                  {new Date(salary.PayDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-5">No records found.</div>
      )}
    </div>
  );
};

export default View;
