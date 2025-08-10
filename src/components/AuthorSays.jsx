import React from 'react';
import { useEffect, useState } from "react";
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

const authors = [
    {
        name: "Alex Johnson",
        role: "Travel Blogger",
        message:
            "As a travel blogger, finding a platform that truly understands sharing travel stories is often tough. Blogify has been a game-changer. Its intuitive interface makes uploading stunning photos and crafting engaging narratives a breeze. The community engagement I've seen here is phenomenal. Blogify isn't just a site; it's a launchpad for adventure and inspiration, truly!",
        image: "https://i.ibb.co/BHLMhMNd/2735.jpg",
    },
    {
        name: "Sarah Kim",
        role: "Food Writer",
        message:
            "Sharing my culinary explorations and best recipes is a true joy, and Blogify has elevated that experience significantly. For a food writer like me, visual presentation is paramount, and Blogify's layout makes my food photography pop beautifully. I appreciate how easy it is to format recipes and connect with readers who share my passion. Blogify is truly a creative kitchen hub!",
        image: "https://i.ibb.co/PGpfL6cB/2148780802.jpg",
    },
    {
        name: "David Lee",
        role: "Tech Enthusiast",
        message:
            "When it comes to breaking down complex topics within the world of gadgets and innovation, clarity & reach are key. Blogify provides an exceptional space as a tech enthusiast to share my insights. Their robust platform handles rich media seamlessly, I'm always impressed by thoughtful discussions my articles generate. If you love tech, Blogify is where your voice belongs!",
        image: "https://i.ibb.co/RTN80z0W/3900.jpg",
    },
];

const AuthorSays = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % authors.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const current = authors[currentIndex];

    return (
        <div className='md:mb-10 lg:mb-10 max-w-11/12 mx-auto'>
            <div className="flex flex-col md:flex-row  text-white">

                <div className="md:w-1/2 bg-black text-white flex flex-col justify-center items-start px-10 py-15 overflow-hidden border-2 border-yellow-400 rounded-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className=" max-w-11/12 mx-auto "
                        >
                            <div className="mb-6"><img src="https://i.ibb.co/8LSDQjBF/icons8-quote-left-64.png" alt="" /></div>
                            <p className="text-xl md:text-2xl leading-relaxed">{current.message}</p>
                            <div className="flex items-center mt-8">
                                <img
                                    src={current.image}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-yellow-400">{current.name}</p>
                                    <p className="text-sm text-white/80">{current.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                <div className="md:w-1/2 flex flex-col justify-center items-center px-10 py-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                        Join Over <span className='text-yellow-400'>16,000</span>+ <br /> Blogify Readers
                    </h2>
                    <p className="text-center mt-4 lg:text-2xl text-gray-600">
                        From beginners to experts, everyone trusts Blogify.
                    </p>
                    <Link to={'/addblog'}>
                    <div className='pt-5'>
                        <button className="text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400

                       group relative inline-flex h-12 items-center justify-center overflow-hidden "><span>Start Publishing</span><div className="ml-1 transition duration-300 group-hover:rotate-[360deg]"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
                    </div>
                    </Link>
                    
                </div>



            </div>
        </div>
    );
};

export default AuthorSays;