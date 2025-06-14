import React from 'react';
import Banner from '../components/Banner';
import RecentBlog from '../components/RecentBlog';
import Newsletter from '../components/Newsletter';
import StatsGrid from '../components/StatsGrid';
import AuthorSays from '../components/AuthorSays';

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            
            <RecentBlog></RecentBlog>
            <Newsletter></Newsletter>
            <StatsGrid></StatsGrid>
            <AuthorSays></AuthorSays>
        </div>
    );
};

export default Home;