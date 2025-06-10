import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import Login from './Login';

const Wishlist = () => {

    const { user } = useContext(AuthContext);
    const userEmail = user?.email;

    const [wishlistBlogs, setWishlistBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWishlist = () => {
        if (!userEmail) return;
        setLoading(true);
        axios.get(`http://localhost:3000/wishlist?userEmail=${encodeURIComponent(userEmail)}`)
            .then(res => {
                setWishlistBlogs(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load wishlist');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchWishlist();
    }, [userEmail]);

    const handleRemove = (blogId) => {
        if (!window.confirm('Are you sure you want to remove this blog from your wishlist?')) return;

        axios.delete('http://localhost:3000/wishlist', {
            data: { blogId, userEmail }
        }).then(() => {
            fetchWishlist();
        }).catch(() => {
            alert('Failed to remove from wishlist');
        });
    };

    if (!userEmail) {
        return <Login></Login>;
    }

    if (loading) 
        return <p className="text-center mt-8">Loading wishlist...</p>;
    if (error) 
        return <p className="text-center mt-8 text-red-600">{error}</p>;

    if (wishlistBlogs.length === 0) {
        return <p className="text-center mt-8 mb-8">Your wishlist is empty.</p>;
    }
    return (
        <div className="max-w-11/12 mx-auto p-5 lg:min-h-[42rem]">
            <h1 className="text-5xl font-bold mb-6 text-center">My Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistBlogs.map(blog => (
                    <div key={blog._id} className="border bg-black rounded-lg shadow p-4 flex flex-col">
                        {blog.imageUrl && (
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                        <p className="flex-grow mb-4 text-xl font-semibold"> Category:  <span className='bg-white text-black rounded-2xl px-1 text-xl font-semibold'>{blog.category}</span> </p>
                        <div className="flex justify-between">
                            <Link
                                to={`/blogdetails/${blog._id}`}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold"
                            >
                                Details
                            </Link>
                            <button
                                onClick={() => handleRemove(blog._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
                            >
                                Remove Wishlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;