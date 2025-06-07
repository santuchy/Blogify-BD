import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsGrid = () => {

      const { ref, inView } = useInView({ triggerOnce: false });


    return (
        <div>
            <div className=' max-w-11/12 mx-auto pt-10'>
            <h2 className='text-center text-5xl font-bold mb-5'>Why Bloggers Love Us</h2>
            <p className='text-center text-lg font-medium mb-10'>Discover the features that empower <br /> writers, connect communities, and bring ideas to life.</p>

            <div ref={ref} className='flex flex-col mx-auto lg:flex-row gap-3 md:gap-0 justify-around pb-20 text-center items-center'>

                <div className='shadow-lg bg-yellow-500 rounded-2xl w-[300px] h-[280px]'>
                    <img className='px-25 pt-5' src="https://i.ibb.co/TMwkqry3/icons8-blog-96-1.png" alt="" />
                    <h3 className='text-7xl font-semibold pt-2 text-black'>{inView && <CountUp end={2000} duration={5} />}+</h3>
                    <p className='text-2xl font-semibold text-black mt-2'>Blogs Published</p>
                </div>

                <div className='shadow-lg bg-yellow-500 rounded-2xl w-[300px] h-[280px]'>
                    <img className='px-24 pt-5' src="https://i.ibb.co/0RszrSyP/icons8-create-100.png" alt="" />
                    <h3 className='text-7xl font-semibold pt-2 text-black'>{inView && <CountUp end={700} duration={5} />}+</h3>
                    <p className='text-2xl font-semibold text-black pt-2'>Writers Joined</p>
                </div>

                <div className='shadow-lg bg-yellow-500 rounded-2xl w-[300px] h-[280px]'>
                    <img className='mx-auto px-24 pt-5' src="https://i.ibb.co/QF9zT1Z4/icons8-comment-100.png" alt="" />
                    <h3 className='text-7xl font-semibold pt-2 text-black'>{inView && <CountUp end={15000} duration={5} />}+</h3>
                    <p className='text-2xl font-semibold text-black pt-2'>Comments Exchanged</p>
                </div>

                <div className='shadow-lg bg-yellow-500 rounded-2xl w-[300px] h-[280px]'>
                    <img className='px-26 pt-5' src="https://i.ibb.co/NnSDCqpX/icons8-variety-100.png" alt="" />
                    <h3 className='text-7xl font-semibold pt-2 text-black'>{inView && <CountUp end={1000} duration={5} />}+</h3>
                    <p className='text-2xl font-semibold text-black pt-2'>Topics Covered</p>
                </div>

            </div>
        </div>
        </div>
    );
};

export default StatsGrid;