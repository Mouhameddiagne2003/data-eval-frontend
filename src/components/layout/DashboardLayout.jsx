import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import {useAuthStore } from "@/store/auth";

const DashboardLayout = () => {
    const { user } = useAuthStore();
    const userType = user?.role;
    return (
        <div className="min-h-screen flex flex-col bg-background w-screen">
            <Header userType={userType} />
            <div className="flex flex-grow">
                <Sidebar userType={userType} />
                <div className="w-full ml-0 flex-grow">
                    <main className="flex-grow p-4 sm:!p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;