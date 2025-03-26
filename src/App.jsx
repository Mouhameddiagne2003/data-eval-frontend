import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import Dashboard from "@/pages/professor/Dashboard";
import CreateExam from "@/pages/professor/CreateExam";
import ProfessorExams from "@/pages/professor/ProfessorExams";
import Exams from "@/pages/student/Exams";
import ExamResults from "@/pages/student/ExamResults";
import AdminHome from "@/pages/admin/AdminHome";
import AdminProfessor from "@/pages/admin/AdminProfessor";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminRoles from "@/pages/admin/AdminRoles";
import AdminExams from "@/pages/admin/AdminExams";
import "./App.css"
import { SessionCheckWrapper } from '@/middlewares/sessionMiddleware';

function App() {
    return (
        <Router>
            <SessionCheckWrapper>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    {/* Routes Professeur */}
                    <Route element={<ProtectedRoute allowedRoles={["professor"]} />}>
                        <Route path="/professor" element={<DashboardLayout userType="professor" />}>
                            <Route index element={<Dashboard />} />
                            <Route path="create-exam" element={<CreateExam />} />
                            <Route path="exams" element={<ProfessorExams />} />
                        </Route>
                    </Route>

                    {/* Routes Étudiant */}
                    <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                        <Route path="/student" element={<DashboardLayout userType="student" />}>
                            <Route index element={<Exams />} />
                            <Route path="results" element={<ExamResults />} />
                        </Route>
                    </Route>

                    {/* Routes Admin */}
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                        <Route path="/admin" element={<DashboardLayout userType="admin" />}>
                            <Route index element={<AdminHome />} />
                            <Route path="professors" element={<AdminProfessor />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="roles" element={<AdminRoles />} />
                            <Route path="exams" element={<AdminExams />} />
                        </Route>
                    </Route>
                </Routes>
            </SessionCheckWrapper>

        </Router>
    );
}

export default App;
