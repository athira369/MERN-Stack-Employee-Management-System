import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddDepartment = () => {
    const[department,setDepartment] = useState({
        dep_name:"",
        description:"",
    })
    const navigate = useNavigate();
    const handleChange =(e) =>{
        const{name,value} = e.target;
        setDepartment({
            ...department,[name]:value
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("https://mern-stack-employee-management-system.vercel.app/api/department/add",department,{
                headers :{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                   
                }
            })
            if(response.data.success){
               navigate("/admin-dashboard/departments")
            }

        }
        catch(error){
            console.error("Error adding department:", error); 
            if (error && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
        // console.log(department);
    }
  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
        <h3 className=" text-2xl font-bold mb-6"> Add New Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              type="text"
                name="dep_name"
                onChange={handleChange}
              placeholder="enter department name"
            
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="description"
              
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="description"
              className="mt-1 p- block w-full border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-2"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
