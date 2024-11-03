import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

const PageDashBoard = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <SideBar />
                <main className="flex-1 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
        </div>
    );
};

export default PageDashBoard;