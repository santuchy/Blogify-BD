import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const BlogDetails = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/blogs/${id}`).then(res => setBlog(res.data));

        axios.get(`http://localhost:3000/comments?blogId=${id}`).then(res => {
            if (Array.isArray(res.data)) {
                setComments(res.data);
            } else {
                setComments([]);
            }
        });
    }, [id]);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const commentData = {
            blogId: id,
            text: commentText,
            userName: user.displayName,
            userPhoto: user.photoURL,
        };

        await axios.post('http://localhost:3000/comments', commentData);
        const res = await axios.get(`http://localhost:3000/comments?blogId=${id}`);
        setComments(res.data);
        setCommentText('');
    };

    if (!blog) return <p>Loading...</p>;

    const isOwner = user?.email === blog?.email;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-white bg-black rounded-2xl shadow-2xl mb-8 mt-8">
            <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover rounded" />
            <div className="mt-6 space-y-2">
                <p><span className="font-semibold">Category:</span> {blog.category}</p>
                <p><span className="font-semibold">Short Description:</span> {blog.shortDescription}</p>
                <p><span className="font-semibold">Long Description:</span> {blog.longDescription}</p>
            </div>

            {isOwner && (
                <button
                    onClick={() => navigate(`/updateblog/${id}`)}
                    className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
                >
                    Update Blog
                </button>
            )}

            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>

                {!isOwner ? (
                    <form onSubmit={handleComment} className="mb-6">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment"
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                            rows="4"
                        ></textarea>
                        <button type="submit" className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
                            Submit
                        </button>
                    </form>
                ) : (
                    <p className="text-sm text-gray-400 italic mb-5">You cannot comment on your own blog.</p>
                )}

                <div className="space-y-4">
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="flex gap-3 items-start">
                                <img src={comment.userPhoto} alt="user" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="text-sm font-semibold">{comment.userName}</p>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm italic">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
