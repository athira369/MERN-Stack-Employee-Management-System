import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { user, loading } = useAuth();
  const [leave, setLeave] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLeave((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://mern-stack-employee-management-system.vercel.app/api/leave/add`,
        leave,
        {
          headers: {
            " Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      if (error?.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-600">
        User not authenticated.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Causal Leave">Causal Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                placeholder="Insert date"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                placeholder="Insert date"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              onChange={handleChange}
              placeholder="Reason for leave"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 bg-teal-600 text-white font-bold rounded"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
