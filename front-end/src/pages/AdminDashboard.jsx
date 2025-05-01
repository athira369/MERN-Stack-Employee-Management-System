import React from 'react'
import { useAuth } from '../context/authContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx'
import NavBar from '../components/dashboard/NavBar'


const AdminDashboard = () => {
  const {user,loading} = useAuth()
 const  navigate = useNavigate()
 if(loading){
  return <div>loading...</div>
 }
  if(!user)
    {
navigate("/login")
  }
  return (
    <div className='flex items-center text-black justify-beween h12 bg-teal-600 h-screen '>
    
      {/* {user && user.name} */}
    <AdminSidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
<NavBar/>
<Outlet/>
    </div>
    </div>
  )
}

export default AdminDashboard