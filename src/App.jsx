import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Layout from "@/components/layout/Layout.jsx"
import Home from "@/pages/Home"
import Dashboard from "@/pages/professor/Dashboard.jsx"
// import StudentDashboard from "./pages/StudentDashboard"
// import AdminDashboard from "./pages/AdminDashboard"
import "./App.css"
import LoginPage from "@/pages/LoginPage.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";
import ProfessorDashboard from "@/pages/professor/ProfessorDashboard.jsx";
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import CreateExam from "@/pages/professor/CreateExam.jsx";
import Exams from "@/pages/student/Exams.jsx";
import ExamResults from "@/pages/student/ExamResults.jsx";
import AdminHome from "@/pages/admin/AdminHome.jsx";
import AdminProfessor from "@/pages/admin/AdminProfessor.jsx";
import AdminUsers from "@/pages/admin/AdminUsers.jsx";
import AdminRoles from "@/pages/admin/AdminRoles.jsx";
import AdminExams from "@/pages/admin/AdminExams.jsx";
// import DashboardLayout from "@/components/layout/DashboardLayout.jsx";



function App() {
    return (
        <Router>
            <Routes>
                {/* Routes avec Layout (Header + Footer) */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                {/*<Route path="/professor" element={<ProfessorDashboard />} />*/}

                {/* Professor Routes */}
                {/*<Route path="/professor" element={<DashboardLayout userType="professor" />}>*/}
                {/*    <Route index element={<Dashboard />} />*/}
                {/*    /!*<Route path="create-exam" element={<CreateExam />} />*!/*/}
                {/*    /!*<Route path="exams" element={<ExamsList />} />*!/*/}
                {/*    /!*<Route path="classes" element={<ClassesList />} />*!/*/}
                {/*    /!*<Route path="reports" element={<Reports />} />*!/*/}
                {/*    /!*<Route path="settings" element={<Settings />} />*!/*/}
                {/*</Route>*/}

                {/* Route Dashboard (sans Layout) */}
                {/*<Route path="/dashboard" element={<DashboardPage />} />*/}
                {/* Professor routes */}

                {/* Routes protégées */}
                <Route element={<ProtectedRoute />}>
                    {/* Routes pour les professeurs */}
                    <Route path="/professor" element={<DashboardLayout userType="professor" />}>
                        <Route index element={<Dashboard />} />
                        <Route path="create-exam" element={<CreateExam />} />
                        {/* Autres pages spécifiques aux professeurs */}
                    </Route>

                    <Route path="/student" element={<DashboardLayout userType="student" />}>
                        <Route index element={<Exams/>} />
                        <Route path="results" element={<ExamResults />} />
                        {/*<Route path="create-exam" element={<CreateExam />} />*/}
                        {/* Autres pages spécifiques aux professeurs */}
                    </Route>

                    {/* Routes pour les étudiants */}
                    <Route path="/admin" element={<DashboardLayout userType="admin" />}>
                        <Route index element={<AdminHome />} />
                        <Route path="professors" element={<AdminProfessor />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="roles" element={<AdminRoles />} />
                        <Route path="exams" element={<AdminExams />} />
                        {/* Autres pages spécifiques aux étudiants */}
                    </Route>

                    {/*/!* Routes pour les admins *!/*/}
                    {/*<Route path="/admin" element={<DashboardLayout />}>*/}
                    {/*    <Route index element={<Dashboard />} />*/}
                    {/*    /!* Autres pages spécifiques aux admins *!/*/}
                    {/*</Route>*/}
                </Route>


            </Routes>
        </Router>
    )
}

export default App