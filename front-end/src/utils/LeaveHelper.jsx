import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width:"72px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width:"120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width:"120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width:"140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width:"170px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width:"80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width:"120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:true,
  },
];
export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) =>{
    navigate(`/admin-dashboard/leaves/${id}`)
  }
  

 
  return (
  
      <button
       className='px-2 py-1 text-white bg-teal-600 hover:bg-teal-700'
        onClick={() => handleView(Id)}
      >
        View
      </button>
      
    
  );
};