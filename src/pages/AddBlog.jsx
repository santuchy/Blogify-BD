import React, { useState } from "react";
import Swal from "sweetalert2";


const AddBlog = () => {


    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        category: "",
        shortDescription: "",
        longDescription: "",
    });

    const categories = ["Technology", "Health", "Travel", "Education", "Lifestyle"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const blogData = Object.fromEntries(formData.entries())
        console.log(blogData);

        fetch('http://localhost:3000/blogs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blogData)
        })
            .then((res) => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('add blog successfully.');
                    Swal.fire({
                        title: "Blog Added Successfully",
                        icon: "success",
                        draggable: true,
                    });
                    setFormData({
                        title: "",
                        imageUrl: "",
                        category: "",
                        shortDescription: "",
                        longDescription: "",
                    });

                }

            })

    };

    return (
        <div className="p-5">
            <div className="max-w-2xl mx-auto p-4 bg-base-200 rounded-2xl shadow-xl">
                <h1 className="text-5xl text-center font-bold mb-4">Add New Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Short Description</label>
                        <textarea
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            rows="2"
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Long Description</label>
                        <textarea
                            name="longDescription"
                            value={formData.longDescription}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
