import React, { use, useState } from 'react';
import { Link, useNavigate, } from 'react-router';

import { toast } from 'react-toastify';
import { AuthContext } from './../context/AuthProvider';



const Register = () => {
    const { createUser, setUser } = use(AuthContext);

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e.target);

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError("Password must contain an uppercase letter.");
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError("Password must contain a special character.");
            return;
        } else if (!/[0-9]/.test(password)) {
            setError("Password must contain a numeric character.");
            return;
        } else {
            setError("");
            console.log("Password is valid!");
        }

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;

        console.log({ name, email, photo, });
        createUser(email, password)
            .then(result => {
                const user = result.user;
                toast.success("Registration successful!");
                // console.log(user);
                navigate("/");
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage, errorCode);
                toast.error("Registration failed, try again...");
            })



    }


    return (
        <div className='flex justify-center p-5 items-center bg-gradient-to-b from-yellow-500 to-white'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Register your account</h2>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input name='name' type="text" className="input" placeholder="Name" required />

                        <label className="label">Email</label>
                        <input name='email' type="email" className="input" placeholder="Email" required />

                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input" placeholder="Photo URL" required />

                        <label className="label">Password</label>
                        <input name='password' type="password" className="input" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />


                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                        <p className='font-semibold text-center pt-5'>Don't Have An Account ? {" "} <Link className='text-red-700' to="/auth/login">Login</Link> </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;