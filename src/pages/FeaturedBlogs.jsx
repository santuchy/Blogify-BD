import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const FeaturedBlogs = () => {
     useEffect(()=> {
            document.title = "Featured Blogs | Blogify";
        }, []);
    const [blogs, setBlogs] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "wordCount", direction: "desc" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get("https://blogify-server-neon.vercel.app/blogs").then((res) => {
            const sortedBlogs = res.data
                .map((blog) => ({
                    ...blog,
                    wordCount: blog.longDescription?.split(" ").length || 0,
                }))
                .sort((a, b) => b.wordCount - a.wordCount)
                .slice(0, 10);
            setBlogs(sortedBlogs);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sorted = [...blogs].sort((a, b) => {
            if (key === "wordCount") {
                return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
            } else {
                return direction === "asc"
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
        });

        setBlogs(sorted);
    };

    return (
        <div className="p-5 max-w-11/12 mx-auto ">
            <div className="text-center mb-4">
                <h2 className="text-4xl lg:text-5xl font-bold ">📌Featured Blogs</h2>
            <p className="text-md lg:text-xl font-semibold text-yellow-500 p-3">Dive into Our Highly Recommended Articles</p>
            </div>
            <div className="overflow-x-auto rounded-2xl">
                <table className="min-w-full bg-black shadow border border-yellow-400 rounded">
                    <thead className="bg-black">
                        <tr className="text-left border border-yellow-400">
                            <th className="px-4 py-3 cursor-pointer">
                                <div className="flex items-center gap-2 justify-center text-yellow-400" onClick={() => handleSort("title")}>
                                    Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
                                </div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer">
                                <div className="flex items-center gap-2 text-yellow-400" onClick={() => handleSort("category")}>
                                    Category {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
                                </div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer">
                                <div className="flex items-center gap-2 text-yellow-400" onClick={() => handleSort("wordCount")}>
                                    Word Count <br /> (by Long Description) {sortConfig.key === "wordCount" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="border-t border-yellow-400">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img src={blog.imageUrl} alt={blog.title} className="w-12 h-12 object-cover rounded" />
                                        {blog.title}
                                    </div>
                                </td>
                                <td className="px-4 py-3 capitalize">{blog.category}</td>
                                <td className="px-4 py-3">{blog.wordCount}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default FeaturedBlogs;
