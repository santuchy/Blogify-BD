import React from 'react';
import Banner from '../components/Banner';
import RecentBlog from '../components/RecentBlog';
import Newsletter from '../components/Newsletter';

const Home = () => {
    return (
        <div>
            <div className=''>
                <Banner></Banner>
            </div>
            
            <RecentBlog></RecentBlog>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;