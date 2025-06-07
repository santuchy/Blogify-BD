import React from 'react';
import Banner from '../components/Banner';
import RecentBlog from '../components/RecentBlog';

const Home = () => {
    return (
        <div>
            <div className=''>
                <Banner></Banner>
            </div>
            
            <RecentBlog></RecentBlog>
        </div>
    );
};

export default Home;