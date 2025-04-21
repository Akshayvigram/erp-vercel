import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
    const [departments,setDepartments]=useState([]);
    const [formData,setFormData]=useState({})
    const navigate=useNavigate(); 
    useEffect(()=>{
        const getDepartments=async()=>{
            const departments=await  fetchDepartments();
            setDepartments(departments);
        }
      getDepartments();
    },[]);
    const handleChange=(e)=>{
        const {name,value,files}=e.target;
        if(name==="image"){
            setFormData((prevDat)=>({...prevDat,[name]:files[0]}))
        }else{
            setFormData((prevDat)=>({...prevDat,[name]:value}))
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const fromDataObj=new FormData();
        Object.keys(formData).forEach((key)=>{
            fromDataObj.append(key,formData[key])
        })
        try{
            // console.log("here");
            // console.log(department);
            // console.log(localStorage.getItem('token'));
            
            const response = await axios.post('/api/employee/add', fromDataObj,{
                headers: { 
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            }) 
            
        if(response.data.success){
            navigate("/admin-dashboard/employees") 

        }
        }catch(error){
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className='max-w-4xl mx-auto mt-8 sm:mt-10 md:mt-12 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md'>
          <h2 className='text-xl sm:text-2xl  md:text-2xl font-bold mb-4 sm:mb-6 mt-5'>Add New Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6'>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder='Enter your Name'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder='Enter your Email'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder='Employee ID'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Date Of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Gender
                </label>
                <select
                  name="gender"
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  placeholder='Designation'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Department
                </label>
                <select
                  name="department"
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map(dep => (
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  placeholder='Salary'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder='*****'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Role
                </label>
                <select
                  name="role"
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept='image/*'
                  className='mt-1 p-1 sm:p-2 block w-full border border-gray-300 rounded-md text-sm sm:text-base'
                  required
                />
              </div>
            </div>
            <button
              className='w-full mt-4 sm:mt-6 bg-[#00B4D9] hover:bg-[#00B4D9] text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-base'
            >
              Add Employee
            </button>
          </form>
        </div>
      );
}

export default AddEmployee