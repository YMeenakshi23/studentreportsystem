// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import api from '../services/api'; // axios instance with baseURL set

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // Call backend API
            const response = await api.post('/auth/register', {
                username,
                password,
            });

            setMessage(response.data || `Registration successful for ${username}! You can now log in.`);
            setUsername('');
            setPassword('');
        } catch (error) {
            setMessage(error.response?.data || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-8 rounded-xl shadow-lg flex flex-col items-center">
                <div className="bg-cyan-600 p-3 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v1a3 3 0 003 3h-6a3 3 0 003-3v-1m-4 6h8m-12 0h-2a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2m-8 0h8m-4 0v-1h-2v1m4 0h-2m-4 0v-1h-2v1" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-center mb-1">Register</h1>
                <p className="text-center text-sm mb-6">Create your account to get started</p>
                
                <div className="p-6 rounded-lg w-full mb-6">
                    <h2 className="text-2xl font-semibold text-center mb-2">Join Our Platform</h2>
                    <p className="text-center text-sm mb-6">Enter your details to create an account</p>

                    <form onSubmit={handleRegister} className="space-y-4">
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
                                    placeholder="Create a secure password"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full mt-4 px-4 py-3 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                        >
                            Register
                        </button>
                    </form>
                    {message && (
                        <p className="mt-4 text-center text-sm">
                            {message}
                        </p>
                    )}
                </div>

                <div className="text-sm">
                    Already have an account? <a href="/login" className="font-bold text-cyan-500 hover:underline">Sign in here</a>
                </div>

                <p className="text-center text-xs mt-4">
                    By registering, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
