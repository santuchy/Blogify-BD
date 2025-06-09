import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from './../context/AuthProvider';
import userIcon from '../assets/icons8-user-100.png';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {

    // sticky navbar
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const { user, logOut } = use(AuthContext);

    const handleLogOut = () => {
        logOut().then(() => {
            alert("You logged out successfully...");
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div className={`sticky top-0 z-50 transition-colors duration-300 ${isSticky ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' : 'bg-transparent'
            }`}>
            <div className="navbar rounded-b-[30px] max-w-11/12 mx-auto shadow-sm">

                <div className="navbar-start ">
                    <div className="dropdown ">

                        <div className='flex items-center'>
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>

                            </div>
                            <div> <img className='w-[150px]' src="https://i.ibb.co/6c5VZRqD/1749283739384.png" alt="" />
                            </div>
                        </div>


                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <Link to={'/'}><button className='btn'>Home</button></Link>

                            <Link to={'/allblogs'}><button className='btn'>All Blogs</button></Link>
                            
                            <Link to={'/featured'}><button className='btn'>Featured Blogs</button></Link>

                            <Link to={'/addblog'}><button className='btn'>Add Blogs</button></Link>

                            <li><a>Wishlist</a></li>
                        </ul>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <Link to={'/'}><button className='focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900'>Home</button></Link>


                         <Link to={'/allblogs'}><button className='focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900'>All Blogs</button></Link>
                        <Link to={'/featured'}><button className='focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900'>Featured Blogs</button></Link>
                        
                        <Link to={'/addblog'}><button className='focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900'>Add Blogs</button></Link>
                        <li><a>Wishlist</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button onClick={handleLogOut} type="button" className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Logout</button>
                    ) : (
                        <>
                            <Link className='text-lg text-[#F8F4E1]' to='/auth/login'><button type="button" className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Login</button></Link>
                            <Link className='text-lg text-[#F8F4E1]' to='/auth/register'><button type="button" className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">Register</button></Link>
                        </>
                    )}

                    {user && (
                        <>
                            <img
                                className="w-[40px] h-[40px] rounded-full bg-white border border-gray-300"
                                src={user.photoURL || userIcon}
                                alt="User"
                                data-tooltip-id="user-tooltip"
                                data-tooltip-content={user.displayName || 'User'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = userIcon;
                                }}
                            />
                            <Tooltip id="user-tooltip" place="bottom" style={{ fontSize: '0.875rem', zIndex: 9999 }} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;