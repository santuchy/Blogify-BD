import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import Loading from './Loading';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const { user } = useContext(AuthContext);
    const [disabledWishlistBtn, setDisabledWishlistBtn] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchBlogs();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, category]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const params = {};
            if (category !== "All") params.category = category;
            if (search) params.search = search;

            const res = await axios.get("http://localhost:3000/blogs/filter", {
                params,
            });
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <Loading />;
    }

    const handleWishlist = async (blogId) => {
        try {
            await axios.post("http://localhost:3000/wishlist", {
                blogId,
                userEmail: user?.email,
            });
            alert("Added to wishlist!");
            setDisabledWishlistBtn(prev => [...prev, blogId]);
        } catch (error) {
            console.error(error);
            alert("Already in wishlist or error");
            setDisabledWishlistBtn(prev => [...prev, blogId]);
        }
    };

    return (
        <div className="p-4 max-w-11/12 mx-auto">
            <div className='text-center'>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">All Blogs</h2>
                <p className='text-xl mb-5 font-semibold text-yellow-500'>Your Gateway to Engaging Reads, All in One Place</p>
            </div>

            <div className="flex gap-4 mb-4 justify-center">
                <input
                    type="text"
                    placeholder="Search by blog title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-3xl"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border bg-black p-2 rounded"
                >
                    <option value="All">All</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (

                    <div key={blog._id} className="card bg-black shadow-sm">
                        <PhotoProvider>
                            <figure>
                                <PhotoView src={blog.imageUrl}>
                                    <img
                                        src={blog.imageUrl}
                                        alt="Shoes"
                                        className="cursor-pointer"
                                    />
                                </PhotoView>
                            </figure>
                        </PhotoProvider>

                        <div className="card-body">
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline bg-black font-semibold">{blog.category}</div>
                                <h2 className="card-title text-xl lg:text-2xl">
                                    {blog.title}

                                </h2>
                                <p>{blog.shortDescription}</p>


                            </div>
                            <div className='flex justify-between mt-3'>
                                <Link
                                    to={`/blogdetails/${blog._id}`}>
                                    <button className="text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400

                                group relative inline-flex h-10 items-center justify-center overflow-hidden bg-neutral-950"><span>View Details</span><div class="ml-1 transition duration-300 group-hover:rotate-[360deg]"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>

                                </Link>

                                <button
                                    onClick={() => handleWishlist(blog._id)}
                                    disabled={disabledWishlistBtn.includes(blog._id)}
                                    className={`text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 group relative inline-flex h-10 items-center justify-center overflow-hidden transition hover:scale-110 ${disabledWishlistBtn.includes(blog._id) ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <span>Add Wishlist</span>
                                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                        <div className="relative h-full w-8 bg-white/20"></div>
                                    </div>
                                </button>

                            </div>
                        </div>
                    </div>

                ))}
            </div>


        </div>
    );
};

export default AllBlogs;
