import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
} from "react-icons/fa";
const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>


        <NavLink
          to="/admin-dashboard/setting"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>


      </div>
    </div>
  );
};

export default AdminSidebar;
