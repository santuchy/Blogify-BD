import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import bgImg from '../assets/Hero/dark-mosaic.png'
import ScrollProgress from '../components/ScrollProgress.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import EntryAnimation from '../pages/EntryAnimation/EntryAnimation.jsx';

const MainLayout = () => {
    return (
        <div style={{ backgroundImage: `url(${bgImg})` }} className='min-h-screen bg-repeat bg-black text-white'>
            <EntryAnimation></EntryAnimation>
            <CustomCursor></CustomCursor>
            <Navbar></Navbar>
            <ScrollProgress></ScrollProgress>
            <div className='overflow-x-hidden'>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollToTop></ScrollToTop>
            </div>
        </div>
    );
};

export default MainLayout;