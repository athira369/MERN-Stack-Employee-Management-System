import axios from "axios";
import { useNavigate } from "react-router-dom";


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
    name: " Image",
    selector: (row) => row.image,
    sortable: true,
    width: "90px",
  },
  {
    name: " Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "120px",
  },
  {
    name: " dob",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    cell: (row) => row.actions,
    center: "true",
  },
];
export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get("https://mern-stack-employee-management-system.vercel.app/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.error("Error adding department:", error);
    if (error && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

//employee for salary form
export const getEmployees = async (id) => {
  let employees;

  try {
    const response = await axios.get(
      `https://mern-stack-employee-management-system.vercel.app/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    console.error("Error getting employee:", error);
    if (error && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  

  // alert(Id);
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-500 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button className="px-3 py-1 bg-yellow-500 text-white"
       onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>
        Salary
        </button>
      <button className="px-3 py-1 bg-red-500 text-white"
      onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >Leave</button>
    </div>
  );
};
