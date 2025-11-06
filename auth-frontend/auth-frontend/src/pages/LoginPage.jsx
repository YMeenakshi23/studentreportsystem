import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { username, password });
            const token = response.data.token;
            
            login(token);

            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;

            if (userRole === 'ADMIN') {
                navigate('/admin/dashboard');
            } else if (userRole === 'TEACHER') {
                navigate('/teacher/dashboard');
            } else {
                navigate('/student/dashboard');
            }

        } catch {
            setError('Invalid username or password. Please try again.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-8 rounded-xl shadow-lg flex flex-col items-center">
                <div className="bg-cyan-600 p-3 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11H9.98a2 2 0 01-1.84-2.75L9.67 4.5a2 2 0 013.66 0l1.53 3.75A2 2 0 0115 11h-1.02" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-center mb-1">Login</h1>
                <p className="text-center text-sm mb-6">Log in to your account</p>
                
                <div className="p-6 rounded-lg w-full mb-6">
                    <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back!</h2>
                    <p className="text-center text-sm mb-6">Enter your credentials to continue</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-semibold mb-2">Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11H9.98a2 2 0 01-1.84-2.75L9.67 4.5a2 2 0 013.66 0l1.53 3.75A2 2 0 0115 11h-1.02" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}
                        
                        <button 
                            type="submit" 
                            className="w-full mt-4 px-4 py-3 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                        >
                            Log In
                        </button>
                    </form>
                </div>

                <div className="text-sm">
                    Don't have an account? <a href="/register" className="font-bold text-cyan-500 hover:underline">Register here</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;