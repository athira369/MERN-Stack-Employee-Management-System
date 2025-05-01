import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";
import AddSalary from "./components/salary/Add.jsx";
import ViewSalary from "./components/salary/View.jsx";
import Summary from "./components/employeeDashboard/Summary.jsx";
import LeavesList from "./components/leave/List.jsx";
import AddLeave from "./components/leave/Add.jsx";
import Settings from "./components/employeeDashboard/Settings.jsx";
import Table from "./components/leave/Table.jsx";
import Detail from "./components/leave/Detail.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}>
          </Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          >

          </Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          >
          </Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}>
          </Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<View />}
          >
          </Route>
          
          <Route
            path="/admin-dashboard/leaves"
            element={<Table />}
          >
          </Route>
          <Route
            path="/admin-dashboard/leaves/:id"
            element={<Detail />}
          >
          </Route>
          <Route
            path="/admin-dashboard/employees/leaves/:id"
            element={<LeavesList />}
          >
          </Route>

          <Route path="employees/edit/:id" element={<Edit />}>
          </Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          >

          </Route>
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path = "/admin-dashboard/setting" element={<Settings />}></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee", "admin"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<View />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves/:id"
            element={<LeavesList />}
          ></Route>
          <Route
            path="/employee-dashboard/add-leaves"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/:id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/employee-dashboard/settings"
            element={<Settings />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
