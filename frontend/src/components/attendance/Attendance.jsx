import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { columns, AttendanceButtons } from '../../utils/AttendanceHelper';
import DataTable from 'react-data-table-component'; 
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const Attendance = () => {

    const [attendance, setAttendance] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filteredAttendance, setFilteredAttendance] = useState(null)
    const [search, setSearch] = useState('');
    let sno = 1; 
    const {id} = useParams()
    const {user} = useAuth();

    const statusChange = () => {
      fetchAttendance();
    }

const fetchAttendance=async()=>{
    try {
  
      const response = await axios.get(`/api/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      
      if(response.data.success){
        setAttendance(response.data.attendance); 
      }
    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.message)
      }
    }finally{
      setLoading(false);
    }

  }
  useEffect(()=>{
    fetchAttendance();
  },[]);
  
  const handleAddAttendance = () => {
    const record={
      employeeId:id,
      date:new Date(),
      status:null
    }
    
  }
  if (!filteredAttendance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-5">
          Manage Attendance
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-2 py-1 sm:px-4 sm:py-1.5 border rounded-md w-full sm:w-auto text-sm sm:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p>
          Mark Employee for <span className="font-bold underline">{new Date().toISOString().split('T')[0]}</span>{" "}
        </p>
          <Link 
          to="admin-dashboard/attendance-report"
          className="px-2 py-1 sm:px-4 sm:py-1.5 bg-[#00B4D9] hover:bg-[#00B4D9] rounded-md text-white text-sm sm:text-base w-full sm:w-auto text-center">
            Attendance Report
          </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredAttendance} pagination paginationRowsPerPage={10} paginationComponentOptions={{ rowsPerPageOptions: [10, 20, 30] }} customStyles={{ rows: { style: { backgroundColor: '#f9fafb', color: '#333', fontSize: '14px' } }, head: { style: { backgroundColor: '#3b82f6', color: '#fff', fontSize: '14px' } } }} />
      </div>
    </div>
  );
};
export default Attendance;