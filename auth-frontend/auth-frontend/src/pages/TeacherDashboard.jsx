import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Import the library for Excel export
import * as XLSX from 'xlsx';

// Register the components Chart.js needs to render the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// --- Main Teacher Dashboard Component ---
function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    const fetchStudents = async () => {
        try {
            const response = await api.get('/teacher/students');
            setStudents(response.data);
        } catch (error) {
            console.error("Failed to fetch students:", error);
            setMessage('Failed to fetch student data.');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // --- Handlers for modals and CRUD operations ---
    const handleEditClick = (student) => {
        setEditingStudent(student);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingStudent(null);
        setMessage('');
    };

    const handleUpdateReport = async (reportData) => {
        try {
            await api.put(`/teacher/students/${editingStudent.id}/report`, reportData);
            setMessage('Student report updated successfully.');
            closeEditModal();
            fetchStudents();
        } catch {
            setMessage('Failed to update report.');
        }
    };
    
    const handleAddStudentClick = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setMessage('');
    };

    const handleCreateStudent = async (newStudentData) => {
        try {
            await api.post('/teacher/students', newStudentData);
            setMessage('Student created successfully.');
            closeAddModal();
            fetchStudents();
        } catch {
            setMessage('Failed to create student. Username may already exist.');
        }
    };
    
    // --- NEW: Function to handle the Excel export ---
    const handleExportToExcel = () => {
        const worksheetData = students.map(student => ({
            Username: student.username,
            'First Name': student.firstName,
            'Last Name': student.lastName,
            Grades: student.grades,
            'Attendance (%)': student.attendance,
            Remarks: student.remarks
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
        XLSX.writeFile(workbook, 'StudentReport.xlsx');
    };

    // --- Function to process student data for the analytics chart ---
    const getGradeDistribution = () => {
        const gradeCounts = {};
        if (Array.isArray(students)) {
            students.forEach(student => {
                if (student.grades) {
                    const grades = student.grades.split(',').map(g => g.trim().toUpperCase());
                    grades.forEach(grade => {
                        if (grade) {
                            gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
                        }
                    });
                }
            });
        }
        return gradeCounts;
    };

    const gradeData = getGradeDistribution();

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Teacher Dashboard</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleExportToExcel}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors"
                        >
                            Export to Excel
                        </button>
                        <button
                            onClick={handleAddStudentClick}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors"
                        >
                            Add New Student
                        </button>
                    </div>
                </div>
                <p className="text-slate-400 mb-6">Manage student profiles and reports.</p>
                
                {message && (
                    <div className="bg-slate-800 text-center py-3 rounded-lg mb-6">
                        <p className={`font-semibold ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
                    </div>
                )}

                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Student List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-slate-700">
                                    <th className="px-4 py-3 text-left text-sm font-semibold rounded-l-lg">Username</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Grades</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Attendance (%)</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Remarks</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(students) && students.map((student) => (
                                    <tr key={student.id} className="bg-slate-700 hover:bg-slate-600 transition-colors">
                                        <td className="px-4 py-3 text-sm rounded-l-lg">{student.username}</td> 
                                        <td className="px-4 py-3 text-sm">{student.grades || '-'}</td>
                                        <td className="px-4 py-3 text-sm">{student.attendance || '-'}</td>
                                        <td className="px-4 py-3 text-sm">{student.remarks || '-'}</td>
                                        <td className="px-4 py-3 text-sm rounded-r-lg">
                                            <button
                                                onClick={() => handleEditClick(student)}
                                                className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-sm transition-colors"
                                            >
                                                Edit Report
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow-lg mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">Class Performance Analytics</h3>
                    {Object.keys(gradeData).length > 0 ? (
                        <GradeAnalyticsChart data={gradeData} />
                    ) : (
                        <p className="text-slate-400">No grade data available to display analytics.</p>
                    )}
                </div>

                <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                    <AddStudentForm onAdd={handleCreateStudent} onCancel={closeAddModal} />
                </Modal>
                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                    {editingStudent && (
                        <UpdateReportForm
                            student={editingStudent}
                            onUpdate={handleUpdateReport}
                            onCancel={closeEditModal}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
}

// --- Sub-Component for the Analytics Chart ---
const GradeAnalyticsChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [ { label: 'Number of Students per Grade', data: Object.values(data), backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1, }, ],
    };
    const options = {
        responsive: true,
        plugins: { legend: { position: 'top', labels: { color: '#cbd5e1' } }, title: { display: true, text: 'Student Grade Distribution', color: '#cbd5e1' }, },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#94a3b8' }, grid: { color: '#475569' } }, x: { ticks: { color: '#94a3b8' }, grid: { color: '#475569' } } }
    };
    return <Bar options={options} data={chartData} />;
};

// --- Sub-Component for the "Add Student" Form ---
const AddStudentForm = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({ username: '', password: '', firstName: '', lastName: '', grades: '', attendance: '', remarks: '' });
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const handleSubmit = (e) => { e.preventDefault(); onAdd(formData); };
    return (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4 text-white">Add New Student</h4>
            <div className="space-y-4">
                <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Temporary Password" required className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <div className="border-t border-slate-600 my-4"></div>
                <input name="grades" value={formData.grades} onChange={handleChange} placeholder="Initial Grades (e.g., A, B+)" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <input name="attendance" type="number" value={formData.attendance} onChange={handleChange} placeholder="Attendance (%)" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Initial Remarks..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 h-24"></textarea>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Student</button>
            </div>
        </form>
    );
};

// --- Sub-Component for the "Update Report" Form ---
const UpdateReportForm = ({ student, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({ grades: student.grades || '', attendance: student.attendance || '', remarks: student.remarks || '' });
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const handleSubmit = (e) => { e.preventDefault(); onUpdate(formData); };
    return (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4 text-white">Updating Report for: {student.firstName} {student.lastName}</h4>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-2">Grades:</label>
                    <input name="grades" value={formData.grades} onChange={handleChange} placeholder="e.g., A, B+, C" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Attendance (%):</label>
                    <input name="attendance" type="number" value={formData.attendance} onChange={handleChange} placeholder="e.g., 95" className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Remarks:</label>
                    <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Add comments..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 h-24"></textarea>
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Changes</button>
            </div>
        </form>
    );
};

export default TeacherDashboard;