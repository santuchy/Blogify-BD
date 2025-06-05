import React from 'react';
import { motion } from "motion/react";
import hero1 from '../assets/Hero/Hero1.jpg';
import hero2 from '../assets/Hero/Hero2.jpg';

const Banner = () => {
    return (
        <div className="max-w-11/12 mx-auto py-2">
            <div className="hero min-h-[27rem] md:min-h-[32rem] flex flex-col-reverse lg:flex-row-reverse lg:gap-12 items-center">
                
                <div className="w-full lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0">
                    <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        Stories That Spark Curiosity
                    </motion.h1>
                    <p className="py-4 text-lg md:text-xl">
                        Tech, life, and ideas that matter. Fresh insights every week.
                    </p>
                    <div className='text-lg text-[#F8F4E1]' to='/auth/login'><button type="button" className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Get Started</button></div>
                </div>

                
                <div className="w-full lg:w-1/2 flex justify-center items-center gap-4 relative">
                    <motion.img
                        src={hero1}
                        animate={{ y: [0, -30, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-50 h-45 md:w-100 md:h-70 shadow-2xl rounded-t-[40px] rounded-br-[40px] border-s-4 border-b-4 md:border-s-8 md:border-b-8 border-black"
                    />
                    <motion.img
                        src={hero2}
                        animate={{ x: [0, -60, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-50 h-45 md:w-100 md:h-70 shadow-2xl rounded-t-[40px] rounded-br-[40px] border-s-4 border-b-4 md:border-s-8 md:border-b-8 border-black"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;