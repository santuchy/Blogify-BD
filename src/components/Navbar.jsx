import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <div className="navbar max-w-11/12 mx-auto bg-base-100 shadow-sm">

                <div className="navbar-start ">
                    <div className="dropdown ">

                        <div className='flex items-center'>
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>

                            </div>
                            <div> <img className='w-[150px]' src="https://i.ibb.co/B5Q3F9Yg/1749130994782.png" alt="" />
                            </div>
                        </div>


                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <Link to={'/'}><li><a>Home</a></li></Link>
                            <li><a>All Blog</a></li>
                            <li><a>Featured Blogs</a></li>
                            <li><a>Add Blogs</a></li>
                            <li><a>Wishlist</a></li>
                        </ul>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <Link to={'/'}><li><a>Home</a></li></Link>
                        <li><a>All Blog</a></li>
                        <li><a>Featured Blogs</a></li>
                        <li><a>Add Blogs</a></li>
                        <li><a>Wishlist</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to={'/auth/login'}><div className='text-lg text-[#F8F4E1]' to='/auth/login'><button type="button" className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Login</button></div></Link>
                    <Link to={'/auth/register'}><div className='text-lg text-[#F8F4E1]' to='/auth/login'><button type="button" className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Register</button></div></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;