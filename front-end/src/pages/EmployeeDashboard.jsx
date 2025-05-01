import React from 'react'
import Sidebar from '../components/employeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/dashboard/NavBar'
const EmployeeDashboard = () => {
  return (
    <div className='flex items-center text-black justify-beween h12 bg-teal-600 h-screen '>
    
      {/* {user && user.name} */}
    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
<NavBar/>
<Outlet/>
    </div>
    </div>
  )
}

export default EmployeeDashboard