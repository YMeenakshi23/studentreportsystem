import React, { useState, useEffect, useRef } from 'react'; // 1. Import useRef
import api from '../services/api';

// 2. Import the PDF generation libraries
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function StudentDashboard() {
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState('');
    
    // 3. Create a ref to target the report card element for capturing
    const reportCardRef = useRef(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await api.get('/student/my-report');
                setReportData(response.data);
            } catch (err) {
                setError('Failed to load your report. Please try again later.');
                console.error(err);
            }
        };
        fetchReport();
    }, []);

    // 4. Add the function to handle the PDF download
    const handleDownloadPdf = async () => {
        const input = reportCardRef.current;
        if (input) {
            const canvas = await html2canvas(input, { backgroundColor: '#1e293b' }); // Match the dark background
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`report-card-${reportData.username}.pdf`);
        }
    };

    if (error) {
        return (
            <div className="bg-slate-900 min-h-screen flex items-center justify-center text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="bg-slate-900 min-h-screen flex items-center justify-center text-slate-200">
                <p>Loading your report...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 p-6 sm:p-10">
            {/* 5. Attach the ref to the main report card div */}
            <div ref={reportCardRef} className="max-w-3xl mx-auto my-10 bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-bold text-white text-center">Student Report Card</h2>
                        {/* 6. Add the download button (outside the captured area is better, but here for context) */}
                        {/* We'll place the actual button outside the ref div */}
                    </div>
                    <div className="bg-slate-700 p-6 rounded-lg mb-6">
                        <h3 className="text-2xl font-semibold text-cyan-400">{reportData.firstName} {reportData.lastName}</h3>
                        <p className="text-sm text-slate-400 mt-1">Username: {reportData.username}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-700 p-4 rounded-lg">
                            <span className="font-semibold text-slate-300">Grades</span>
                            <span className="text-lg font-bold text-white">{reportData.grades || 'Not available'}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-700 p-4 rounded-lg">
                            <span className="font-semibold text-slate-300">Attendance</span>
                            <span className="text-lg font-bold text-white">{reportData.attendance ? `${reportData.attendance}%` : 'Not available'}</span>
                        </div>
                        <div className="bg-slate-700 p-4 rounded-lg">
                            <span className="block font-semibold text-slate-300 mb-2">Teacher's Remarks</span>
                            <p className="text-sm text-slate-400 italic leading-relaxed">{reportData.remarks || 'No remarks yet.'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Place the actual button here so it's not part of the PDF */}
            <div className="max-w-3xl mx-auto text-center">
                 <button 
                    onClick={handleDownloadPdf}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
                >
                    Download as PDF
                </button>
            </div>
        </div>
    );
}

export default StudentDashboard;