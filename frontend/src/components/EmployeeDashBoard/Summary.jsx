import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const SummaryCard = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-6">
      <div className="rounded-lg flex bg-white shadow-md w-full max-w-md mx-auto lg:max-w-full">
        <div
          className="text-2xl sm:text-3xl lg:text-4xl flex justify-center items-center bg-[#00B4D9] text-white px-3 sm:px-4 lg:px-5 py-2"
        >
          <FaUser />
        </div>
        <div className="pl-3 sm:pl-4 lg:pl-5 py-2 flex-1">
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
            Welcome Back
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            {user.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;