import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import Loading from './Loading';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const ITEMS_PER_PAGE = 6;

const AllBlogs = () => {
  useEffect(() => {
    document.title = "All Blogs | Blogify";
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const [disabledWishlistBtn, setDisabledWishlistBtn] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBlogs();
    }, 300);
    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  // সার্চ বা ক্যাটাগরি বদলালে পেজ ১-এ রিসেট
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== "All") params.category = category;
      if (search) params.search = search;

      const res = await axios.get("https://blogify-server-neon.vercel.app/blogs/filter", {
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
      await axios.post("https://blogify-server-neon.vercel.app/wishlist", {
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

  // ✅ derived pagination data
  const totalItems = blogs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = blogs.slice(startIndex, endIndex);

  const gotoPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // ঐচ্ছিক: পেজ বদলালে উপরে স্ক্রল
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // পেজ নাম্বার বাটন (ছোট/কমপ্যাক্ট)
  const renderPageNumbers = () => {
    // অনেক পেজ হলে 1 ... cur-1, cur, cur+1 ... last দেখাই
    const pages = [];
    const add = (p) => pages.push(p);

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) add(i);
    } else {
      add(1);
      if (currentPage > 3) add('...');
      const start = Math.max(2, currentPage - 1);
      const finish = Math.min(totalPages - 1, currentPage + 1);
      for (let p = start; p <= finish; p++) add(p);
      if (currentPage < totalPages - 2) add('...');
      add(totalPages);
    }

    return pages.map((p, idx) =>
      p === '...' ? (
        <span key={`dots-${idx}`} className="px-2 text-gray-400">…</span>
      ) : (
        <button
          key={p}
          onClick={() => gotoPage(p)}
          className={`px-3 py-1 rounded-md text-sm border ${
            currentPage === p
              ? 'bg-yellow-400 text-black border-yellow-400'
              : 'border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black'
          }`}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className="p-4 max-w-11/12 mx-auto">
      <div className='text-center'>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">All Blogs</h2>
        <p className='text-xl mb-5 font-semibold text-yellow-500'>Your Gateway to Engaging Reads, All in One Place</p>
      </div>

      <div className="flex gap-4 mb-6 justify-center">
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

      {/* Cards (কমপ্যাক্ট সাইজ) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="card bg-black shadow-sm w-full max-w-sm mx-auto"
          >
            <PhotoProvider>
              <figure className="h-40 overflow-hidden">
                <PhotoView src={blog.imageUrl}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="cursor-pointer w-full h-full object-cover"
                  />
                </PhotoView>
              </figure>
            </PhotoProvider>

            <div className="card-body p-4">
              <div className="card-actions justify-start">
                <div className="badge badge-outline bg-black font-semibold">{blog.category}</div>
                <h2 className="card-title text-lg lg:text-xl">{blog.title}</h2>
                <p className="text-sm">{blog.shortDescription}</p>
              </div>

              <div className='flex justify-between mt-3'>
                <Link to={`/blogdetails/${blog._id}`}>
                  <button className="text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-4 py-2 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400">
                    View Details
                  </button>
                </Link>

                <button
                  onClick={() => handleWishlist(blog._id)}
                  disabled={disabledWishlistBtn.includes(blog._id)}
                  className={`text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-4 py-2 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400 ${
                    disabledWishlistBtn.includes(blog._id) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => gotoPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed border-gray-500 text-gray-400'
                : 'border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black'
            }`}
          >
            Prev
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => gotoPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed border-gray-500 text-gray-400'
                : 'border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* ছোট info */}
      <div className="mt-3 text-center text-sm text-gray-400">
        Showing {Math.min(endIndex, totalItems)} of {totalItems} blogs
      </div>
    </div>
  );
};

export default AllBlogs;
