import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import bgImg from '../assets/Hero/dark-mosaic.png'

const MainLayout = () => {
    return (
        <div style={{ backgroundImage: `url(${bgImg})` }} className='min-h-screen bg-repeat bg-black text-white'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;