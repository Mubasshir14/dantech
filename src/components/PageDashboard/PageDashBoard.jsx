import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

const PageDashBoard = () => {
    return (
        <div>
            <div className='relative min-h-screen md:flex '>
                <SideBar />
                <div className='flex-1 md:ml-64'>
                    <div className='p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageDashBoard;