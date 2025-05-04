import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [datefilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (datefilter) {
        query.append("date", datefilter);
      }

      const response = await axios.get(
        `https://mern-stack-employee-management-system.vercel.app/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response", response.data);

      if (response.data.success) {
        let sno = 1;
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
        // Assuming `data` holds the list
      }
      setLoading(false);
    } catch (error) {
      console.log("error.message");
      console.error("Failed to fetch attendance report", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, limit, datefilter]); // Refetch when pagination or filter changes
  const handleLoadmore = () => {
    setSkip((prevskip) => prevskip + limit);
  };
  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>
      <div>
        <h2 className="text-xl-semibold">FilterbyDate</h2>
        <input type="date" className="border bg-gray-100" 
        value={datefilter}
        onChange={(e) => {setDateFilter(e.target.value)
        setSkip(0)}}/>
      </div>
      {loading ? (
        <div>loading....</div>
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div className="mt-4 border-b  mb-2" key={date}>
            <h2 className="text-xl font-semibold">{date}</h2>
            <div className="overflow-x-auto">
              <table
                className="w-full border-collapse border border-gray-200"
                border="1"
                cellPadding="10"
              >
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2">S.no</th>
                    <th className="border border-gray-200 p-2">Date</th>
                    <th className="border border-gray-200 p-2">Employee Id</th>
                    <th className="border border-gray-200 p-2">
                      Employee Name
                    </th>
                    <th className="border border-gray-200 p-2">Department</th>
                    <th className="border border-gray-200 p-2">status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((data, i) => (
                    <tr key={data.employeeId}>
                      <td className="border p-2 text-center">{i + 1}</td>
                      <td className="border p-2 text-center">{date}</td>
                      <td className="border p-2 text-center">
                        {data.employeeId}
                      </td>
                      <td className="border p-2 text-center">
                        {data.employeeName}
                      </td>
                      <td className="border p-2 text-center">
                        {data.departmentName}
                      </td>
                      <td className="border p-2 text-center">{data.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
      <button
        className="px-4 py-2 border bg-gry-100 text-ig font-semibold"
        onClick={handleLoadmore}
      >
        Load More
      </button>
    </div>
  );
};

export default AttendanceReport;
