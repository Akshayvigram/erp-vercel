import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
const EmployeeList = () => {
    const[employees,setEmployees]=useState([]);
    const[empLoading,setEmpLoading]=useState(false);
    const[filteredEmployees,setFilteredEmployees]=useState([])
    useEffect(()=> {
        const fetchEmployees = async () => {
          setEmpLoading(true)
          try {
            const response = await axios.get('http://localhost:5000/api/employee',{
              headers : {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
              let sno = 1;
              const data = await response.data.employees.map((emp) => (
                {
                  _id: emp._id,
                  sno: sno++,
                  dep_name: emp.department.dep_name,
                  name:emp.userId.name,
                  dob:new Date(emp.dob).toLocaleDateString(),
                  profileImage:<img className="rounded-full" src={`/${emp.userId.profileImage}`}/>,
                  action: (<EmployeeButtons id={emp._id}/>),
                }
              ));
              setEmployees(data);
              setFilteredEmployees(data)
            }
          }catch(error){
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
          }
          } finally {
            setEmpLoading(false)
          }
        };
    
        fetchEmployees();
      }, []);
      const handleFilter=(e)=>{
        const records=employees.filter((emp)=>(
          emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records);
      }
      return (
        <div className='min-h-screen flex flex-col p-2 sm:p-4 md:p-6 bg-gray-100'>
          <div className='text-center mb-3 sm:mb-4 md:mb-6'>
            <h3 className='text-xl sm:text-2xl  md:text-2xl font-bold mt-10'>Manage Employees</h3>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2 sm:gap-3'>
            <input 
              type="text" 
              placeholder='Search By Name' 
              className='w-full sm:w-56 md:w-64 px-2 sm:px-3 md:px-4 py-1 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base'
              onChange={handleFilter}
            />
            <Link 
              to="/admin-dashboard/add-employee" 
              className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-1 sm:py-2 bg-teal-600 rounded-md text-white text-sm sm:text-base text-center hover:bg-teal-700 transition-colors"
            >
              Add New Employee
            </Link>
          </div>
          <div className='flex-grow mt-3 sm:mt-4  bg-white rounded-md shadow-md'>
            <DataTable 
              columns={columns} 
              data={filteredEmployees} 
              pagination
              progressPending={empLoading}
              responsive
              className='w-full'
              customStyles={{
                table: {
                  style: {
                    minWidth: '100%',
                  },
                },
                headCells: {
                  style: {
                    fontSize: '10px sm:12px md:14px',
                    fontWeight: 'bold',
                    padding: '6px sm:8px md:10px',
                    whiteSpace: 'nowrap',
                  },
                },
                cells: {
                  style: {
                    fontSize: '11px sm:13px md:14px',
                    padding: '6px sm:8px md:10px',
                  },
                },
                pagination: {
                  style: {
                    borderTop: '1px solid #e5e7eb',
                    fontSize: '12px sm:14px',
                  },
                },
              }}
              noDataComponent={<div className='p-3 sm:p-4 text-center text-sm sm:text-base'>No employees found</div>}
              progressComponent={<div className='p-3 sm:p-4 text-center text-sm sm:text-base'>Loading...</div>}
            />
          </div>
        </div>
      )
}

export default EmployeeList