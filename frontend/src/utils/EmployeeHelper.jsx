import axios from "axios";
import { useNavigate } from "react-router-dom";
export const columns = [
    {
        name : "S No",
        selector : (row) => row.sno,
        width:"70px"
    },
    {
        name : "Name",
        selector : (row) => row.name,
        sortable: true,
        width:"100px"
    },
    {
        name : "Image",
        selector : (row) => row.profileImage,
        width:"90px"
       
    },
    {
        name : "Department",
        selector : (row) => row.dep_name,
        width:"120px"
    },
    {
        name : "DOB",
        selector : (row) => row.dob,
        width:"130px",
        sortable: true,
    },
    {
        name : "Action",
        selector : (row) => row.action,
        center:"true"
    },
] 
export const fetchDepartments = async () => {
    let departments;
    
    try {
      const response = await axios.get('/api/department',{
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        departments=response.data.departments;
      }
    }catch(error){
      if(error.response && error.response.data.success){
          alert(error.response.data.error)
    }
    } 
    return departments;
  };

  export const getEmployees = async (id) => {
    let employees;
    
    try {
      const response = await axios.get(`/api/employee/department/${id}`,{
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        employees=response.data.employees;
      }
    }catch(error){
      if(error.response && error.response.data.success){
          alert(error.response.data.error)
    }
    } 
    return employees;
  };


  export const EmployeeButtons = ({id}) => {
    const navigate = useNavigate()
   
    return (
      <div className="flex space-x-2 sm:space-x-3 overflow-x-auto">
        <button
          className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-base rounded-md transition-colors whitespace-nowrap"
          onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
        >
          View
        </button>
        <button
          className="px-2 py-1 sm:px-4 sm:py-2 bg-[#00B4D9] hover:bg-[#00B4D9] text-white text-xs sm:text-base rounded-md transition-colors whitespace-nowrap"
          onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 sm:px-4 sm:py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-xs sm:text-base rounded-md transition-colors whitespace-nowrap"
          onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
        >
          Salary
        </button>
        <button
          className="px-2 py-1 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-base rounded-md transition-colors whitespace-nowrap"
          onClick={() => navigate(`/admin-dashboard/employees/leaves/${id}`)}
        >
          Leave
        </button>
      </div>
    );
}