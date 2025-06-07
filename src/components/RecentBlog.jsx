import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';



const RecentBlog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/blogs/recent')
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error('Failed to fetch recent blogs:', err));
    }, []);

    return (
        <div className='max-w-11/12 mx-auto pb-5'>
            <h2 className='text-center text-4xl md:text-5xl font-bold p-5'>Recent Blog Posts</h2>
            <p className='text-center text-xl font-medium pb-5'>Catch up on our latest stories and insights</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {blogs.map((blog, index) => (
                    <motion.div key={blog._id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="card bg-base-100 image-full shadow-sm">
                            <figure>
                                <img
                                    src={blog.imageUrl}
                                    alt="blog" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">{blog.title}</h2>
                                <p>{blog.shortDescription}</p>
                                <div className="card-actions justify-end">
                                   
                                    <Link>
                                        <button className="text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 group relative inline-flex h-10 items-center justify-center overflow-hidden   transition hover:scale-110"><span>View Details</span><div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div class="relative h-full w-8 bg-white/20"></div></div></button>
                                   </Link>
                                   <Link>
                                        <button className="text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 group relative inline-flex h-10 items-center justify-center overflow-hidden   transition hover:scale-110"><span>Add Wishlist</span><div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div class="relative h-full w-8 bg-white/20"></div></div></button>
                                   </Link>
                                </div>

                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentBlog;
