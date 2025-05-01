import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
    const navigate = useNavigate();
    const {user} = useAuth()
    const [setting,setSettings] = useState({
        userId:user._id,
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",

    });
    const [error,setError]= useState("");
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setSettings ({...setting,[name]:value});
    }
    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(setting.newPassword !== setting.confirmPassword)
        {
        setError("New Password and confirm password do not match")     
         }else{
          try{
            const response = await axios.put("http://localhost:5000/api/settings/change-password",setting
              ,{
                headers:{
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if(response.data.success)
            {
              navigate("/admin-dashboard/employees");
              alert("Password changed successfully")
              setError("")
            }
          }catch(error){
           console.error("Error fetching leaves:", error);
        if (error.response && ! error.response.data.success) {
           setError(error.response.data.error);
        }
        }
        }
      }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96 ">
    <h2 className="text-2xl font-bold mb-6">Change Password</h2>
    <p className="text-red-500">{error}</p>
    <form onSubmit={handleSubmit}>
      
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Old password
          </label>
          <input
            type="password"
            name="oldPassword"
            onChange={handleChange}
            placeholder="Change password"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            placeholder=" New Password"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md"
            required
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium text-gray-700">
          confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="confirm password"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md"
            required
          />
        </div>
      
      <button
        type="submit"
        className=" w-full mt-6 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded"
      >
        Change Password
      </button>
    </form>
  </div>
);
};
export default Settings;