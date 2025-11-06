import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';

// Import the library for Excel export
import * as XLSX from 'xlsx';

// --- Main Admin Dashboard Component ---
function AdminDashboard() {
    // State for the new teacher form
    const [formData, setFormData] = useState({
        username: '', password: '', firstName: '', lastName: '',
        email: '', phoneNumber: '', dateOfBirth: '', gender: ''
    });
    
    // State for the list of teachers and messages
    const [teachers, setTeachers] = useState([]);
    const [message, setMessage] = useState('');

    // State to manage the edit modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);

    // Function to fetch all teachers from the backend
    const fetchTeachers = async () => {
        try {
            const response = await api.get('/admin/teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error("Failed to fetch teachers:", error);
            setMessage('Failed to fetch teacher data.');
        }
    };

    // Fetch teachers when the component first loads
    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateTeacher = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/admin/create-teacher', formData);
            setMessage(`Teacher account for '${formData.username}' created successfully!`);
            fetchTeachers(); // Refresh the list
            // Reset form
            setFormData({ username: '', password: '', firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '' });
        } catch (error) {
            console.error("Failed to create teacher account:", error);
            setMessage('Failed to create teacher account.');
        }
    };

    const handleDelete = async (teacherId) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await api.delete(`/admin/teachers/${teacherId}`);
                setMessage('Teacher deleted successfully.');
                fetchTeachers();
            } catch (error) {
                console.error('Failed to delete teacher:', error);
                setMessage('Failed to delete teacher.');
            }
        }
    };

    const handleEditClick = (teacher) => {
        setEditingTeacher(teacher);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTeacher(null);
    };

    const handleUpdateTeacher = async (updatedTeacher) => {
        try {
            await api.put(`/admin/teachers/${updatedTeacher.id}`, updatedTeacher);
            setMessage('Teacher updated successfully.');
            closeModal();
            fetchTeachers();
        } catch (error) {
            console.error('Failed to update teacher:', error);
            setMessage('Failed to update teacher.');
        }
    };
    
    // Function to handle the Excel export
    const handleExportToExcel = () => {
        const worksheetData = teachers.map(teacher => ({
            Username: teacher.username,
            'First Name': teacher.firstName,
            'Last Name': teacher.lastName,
            Email: teacher.email,
            'Phone Number': teacher.phoneNumber,
            Gender: teacher.gender,
            'Date of Birth': teacher.dateOfBirth
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Teachers');
        XLSX.writeFile(workbook, 'TeacherList.xlsx');
    };

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
                    <button
                        onClick={handleExportToExcel}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors"
                    >
                        Export to Excel
                    </button>
                </div>
                <p className="text-slate-400 mb-6">Welcome, Admin! Manage your teacher accounts and system settings.</p>

                {message && (
                    <div className={`bg-slate-800 text-center py-3 rounded-lg mb-6 ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                        <p className="font-semibold">{message}</p>
                    </div>
                )}

                {/* Create New Teacher Form */}
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Create New Teacher</h3>
                    <form onSubmit={handleCreateTeacher} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                        <input name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <input name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Gender" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                        <div className="md:col-span-2 lg:col-span-3">
                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors">
                                Create Teacher
                            </button>
                        </div>
                    </form>
                </div>

                {/* Teachers List */}
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Teacher List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-slate-700">
                                    <th className="px-4 py-3 text-left text-sm font-semibold rounded-l-lg">Username</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher) => (
                                    <tr key={teacher.id} className="bg-slate-700 hover:bg-slate-600 transition-colors">
                                        <td className="px-4 py-3 text-sm rounded-l-lg">{teacher.username}</td>
                                        <td className="px-4 py-3 text-sm">{teacher.firstName} {teacher.lastName}</td>
                                        <td className="px-4 py-3 text-sm hidden md:table-cell">{teacher.email}</td>
                                        <td className="px-4 py-3 text-sm rounded-r-lg space-x-2">
                                            <button onClick={() => handleEditClick(teacher)} className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-sm transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(teacher.id)} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-sm transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal for Editing */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {editingTeacher && (
                        <EditTeacherForm
                            teacher={editingTeacher}
                            onUpdate={handleUpdateTeacher}
                            onCancel={closeModal}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
}

// --- Sub-Component for the "Edit Teacher" Form ---
const EditTeacherForm = ({ teacher, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState(teacher);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4 text-white">Edit Teacher: {teacher.username}</h4>
            <div className="space-y-4">
                <input name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="email" type="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} placeholder="Phone Number" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="gender" value={formData.gender || ''} onChange={handleChange} placeholder="Gender" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                 <input name="dateOfBirth" type="date" value={formData.dateOfBirth || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Update Teacher</button>
            </div>
        </form>
    );
};

export default AdminDashboard;