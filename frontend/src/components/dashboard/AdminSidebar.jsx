import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import {AiOutlineFileText} from 'react-icons/ai'

const AdminSidebar = () => {
  return (
    <div className="hidden md:block bg-gray-800 text-white w-64 fixed top-0 left-0 h-screen space-y-2 z-40 ">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`
          }
          end
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`
          }
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to={`/admin-dashboard/attendance`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaRegCalendarAlt />
          <span>Attendance</span>
        </NavLink>
        <NavLink
          to={`/admin-dashboard/attendance-report`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <AiOutlineFileText />
          <span>Attendance Report</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
