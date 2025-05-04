import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component"
import axios from 'axios';
const List = () => {
   const [empLoading, setEmpLoading] = useState(false);
    const [employees,setEmployees]= useState([]);
    const [filteredEmployee,setFilteredEmployees]=useState([]);
   
      useEffect(() => {
        const fetchEmployees = async () => {
          setEmpLoading(true);
          try {
            const response = await axios.get(
              "https://mern-stack-employee-management-system.vercel.app/api/employee",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.data.success) {
              const data = response.data.employees.map((emp, index) => ({
                _id: emp._id,
                sno: index + 1,
                dep_name: emp.department.dep_name,
                name:emp.userId.name,
                dob: new Date(emp.dob).toLocaleDateString(),
                image:<img  width={40} className='rounded-full'src ={`https://mern-stack-employee-management-system.vercel.app/${emp.userId.image}`}/>,
                actions: (<EmployeeButtons Id ={emp._id}/>
                  
                ),
              }));
              // console.log("Formatted Data:", data); // Debugging line
              // console.log("Columns:", columns);
              setEmployees(data);
              setFilteredEmployees(data);
              
            }
          } catch (error) {
            console.error("Error adding department:", error);
            if (error && !error.response.data.success) {
              alert(error.response.data.error);
            }
          } finally {
            setEmpLoading(false);
          }
        };
        fetchEmployees();
      }, []);
      const handleFilter =(e)=>{
        const records = employees.filter((emp)=>
        emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredEmployees(records);
      }
     
        // console.log("Rendering with departments:", employees);
        // console.log("Rendering with columns:", columns);
      return (
        <>
      {empLoading ? (
        <div>Loading..</div>
      ) : (
    <div>
      <div className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employee</h3>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search By Department Name"
                  className="px-6 py-0.5 border"
                  onChange={handleFilter}
                />
                <Link
                  to="/admin-dashboard/add-employee"
                  className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                  Add New Employee
                </Link>
              </div>
              </div>
             <div>
              <DataTable columns={columns } data={filteredEmployee} pagination/>
             </div>
      </div>
       )}
    </>
  )
}

export default List