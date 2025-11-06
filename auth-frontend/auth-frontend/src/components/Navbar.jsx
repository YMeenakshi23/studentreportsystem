import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-slate-800 p-6 text-slate-200 shadow-md">
      <Link to="/" className="text-2xl font-bold text-cyan-500">
        Student Report System
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-slate-200 hover:text-cyan-400 font-semibold px-2 transition-colors">Home</Link>
        <Link to="/about" className="text-slate-200 hover:text-cyan-400 font-semibold px-2 transition-colors">About Us</Link>
        {token ? (
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-slate-200 hover:text-cyan-400 font-semibold px-2 transition-colors">Login</Link>
            <Link to="/register" className="text-slate-200 hover:text-cyan-400 font-semibold px-2 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
