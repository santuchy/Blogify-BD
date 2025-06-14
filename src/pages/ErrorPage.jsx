import React from 'react';
import { Link, useRouteError } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bgImg from '../assets/Hero/dark-mosaic.png'
import ScrollProgress from '../components/ScrollProgress';
import ScrollToTop from './../components/ScrollToTop';

const ErrorPage = () => {
  
    const error = useRouteError()
  console.log(error?.error?.message)
    return (
        <div style={{ backgroundImage: `url(${bgImg})` }} className='min-h-screen bg-repeat bg-black text-white  '>
          <Navbar />
          <ScrollProgress></ScrollProgress>
        <div className='text-center pb-10 max-w-11/12 mx-auto'>
            <img className='mx-auto lg:h-[500px]' src="https://i.ibb.co/rKWkd0fx/404-error-with-people-holding-numbers-concept-illustration.png" alt="" />
          <h1 className='mb-8 text-7xl font-semibold text-yellow-400'>
            {error?.status || 404}
          </h1>
          <p className='mb-3 text-xl font-bold text-white md:text-2xl'>
            {error?.error?.message || 'Something Went Wrong!'}
          </p>
          <Link to='/'>
        <button className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Go to Homepage</button>
        </Link>
        </div>
        <Footer/>
        <ScrollToTop></ScrollToTop>
        </div>
      
    );
};

export default ErrorPage;