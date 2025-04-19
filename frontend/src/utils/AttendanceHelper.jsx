import React from 'react'
import axios from 'axios'


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
        name : "Emp Id",
        selector : (row) => row.employeeId,
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
        selector : (row) => row.department,
        width:"120px"
    },
    
    {
        name : "Action",
        selector : (row) => row.action,
        center:"true"
    },
]  

export const AttendanceButtons = ({ employeeId ,status, statusChange}) => {
    const markEmployee = async (status, employeeId, date) => {
        try {
            const response = await axios.put(`https://erp-backend-tawny.vercel.app/api/attendance/update/${employeeId}`, {
                status: status,
                employeeId: employeeId,
                date: date,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            if (response.data.success) {
                
                alert ("Employee marked successfully");
                window.location.reload();
                statusChange();
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
                statusChange();
            }
        }
    }
    return (
        <div>
            {status == null ?
            <div className = "flex space-x-8">
                <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => markEmployee("present", employeeId, new Date().toISOString().split('T')[0])}>
                Present
                </button>
                <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => markEmployee("absent", employeeId, new Date().toISOString().split('T')[0])}>
                Absent
                </button>
                <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => markEmployee("sick", employeeId, new Date().toISOString().split('T')[0])}>
                Sick
                </button>
                <button
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={() => markEmployee("leave", employeeId, new Date().toISOString().split('T')[0])}>
                Leave
                </button>
            </div>
            : (
            <p className = "bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
            )
            }
        </div>
    );
};
export default AttendanceButtons;