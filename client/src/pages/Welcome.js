import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Student Task Manager</h1>
        
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            A simple and efficient way to manage your academic tasks throughout the semester.
          </p>
          <p className="text-gray-600">
            Keep track of assignments, projects, and deadlines all in one place.
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>
          
          <button 
            onClick={() => navigate('/register')}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Register
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>No registration required. Start organizing your tasks right away!</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome; 