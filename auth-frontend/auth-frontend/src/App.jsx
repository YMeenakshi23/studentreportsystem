import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard
import ProtectedRoute from './components/auth/ProtectedRoute'; // Import ProtectedRoute
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDasboard';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs'; // Import AboutUs

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Admin Protected Route */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* We can add Teacher and Student routes later */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER', 'ADMIN']} />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
