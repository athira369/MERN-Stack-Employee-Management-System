import { useNavigate } from "react-router-dom";
import axios from "axios";
export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable:true
  },
  {
    name: "Action",
    cell: (row) => row.actions,
  },
];
export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      try {
        const response = await axios.delete(
          `https://mern-stack-employee-management-system.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };
  // alert(Id);
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};
