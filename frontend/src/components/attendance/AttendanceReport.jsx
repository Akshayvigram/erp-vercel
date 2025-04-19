import React, { useEffect, useState } from 'react'

const AttendanceReport = () => {
    const [report, setReport] = useState(null)
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [dateFilter, setDateFilter] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchReport = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({limit, skip});
            if(dateFilter){
                query.append("date", dateFilter)
            }
            const response = await axios.get(`http://localhost:5000/api/attendance/report`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(response.data);
            
            if (response.data.success) {
                let sno = 1;
                if(skip == 0) {
                    setReport(response.data.groupDate);
                }else {
                    setReport((prevData) => ({
                        ...prevData,
                        ...response.data.groupData
                    }))
                }
            }
            setLoading(false);
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        fetchReport();
    }, [skip, dateFilter]);

    const handleLoadMore = () => {
        setSkip(skip + limit);
    }
    return (
        <div className='min-h-screen p-10 sm:p-6 bg-white'>
            <h1 className='text-center text-2xl font-bold mt-4 sm:mt-5'>Attendance Report</h1>
            <div>
                <h2 className='text-xl font-semibold'>Filter by Date</h2>
                <input type="date" value={dateFilter} onChange={(e) => {setDateFilter(e.target.value); setSkip(0)}} /> 
            </div>
            {report && Object.entries(report).map(([date, records]) => (
                <div className="mb-4" key={date}>
                    <h2 className='text-xl font-semibold'>{date}</h2>
                    <div>
                        <table className='w-full border-collapse border border-gray-500' cellPadding="10" cellSpacing="0">
                            <thead>
                                <tr>
                                <th className='border border-gray-500'>S No</th>
                                <th className='border border-gray-500'>Name</th>
                                <th className='border border-gray-500'>Employee ID</th>
                                <th className='border border-gray-500'>Image</th>
                                <th className='border border-gray-500'>Department</th>
                                <th className='border border-gray-500'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-gray-500'>{sno++}</td>
                                    <td className='border border-gray-500'>{item.name}</td>
                                    <td className='border border-gray-500'>{item.employeeId}</td>
                                    <td className='border border-gray-500'><img src={item.profileImage} alt={item.name} /></td>
                                    <td className='border border-gray-500'>{item.department.name}</td>
                                    <td className='border border-gray-500'><AttendanceButtons id={item.employeeId} status={item.status} statusChange={statusChange} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleLoadMore}>Load More</button>
                </div>
            </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default AttendanceReport