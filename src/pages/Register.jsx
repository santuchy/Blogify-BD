import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from './../context/AuthProvider';
import Lottie from 'lottie-react';
import registerAnim from '../assets/Lottie/register animation.json';

const Register = () => {
  useEffect(() => {
    document.title = "Register | Blogify";
  }, []);

  const { createUser, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain an uppercase letter.");
      return;
    } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      setError("Password must contain a special character.");
      return;
    } else if (!/[0-9]/.test(password)) {
      setError("Password must contain a numeric character.");
      return;
    } else {
      setError("");
    }

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Registration successful!");
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        toast.error("Registration failed, try again...");
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
        
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[550px]">
            <Lottie
              animationData={registerAnim}
              loop
              autoplay
              aria-label="Register animation"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        
        <div className="flex items-center justify-center">
          <div className="card bg-base-100  text-black w-full max-w-sm shrink-0 shadow-2xl py-5">
            <h2 className="font-semibold text-2xl text-center">Register your account</h2>
            <form onSubmit={handleRegister} className="card-body">
              <fieldset className="fieldset">
                <label className="label text-black">Name</label>
                <input name="name" type="text" className="input" placeholder="Name" required />

                <label className="label text-black">Email</label>
                <input name="email" type="email" className="input" placeholder="Email" required />

                <label className="label text-black">Photo URL</label>
                <input name="photo" type="text" className="input" placeholder="Photo URL" required />

                <label className="label text-black">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input text-black"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                <button type="submit" className="btn btn-neutral mt-4">Register</button>
                <p className="font-semibold text-center pt-5">
                  Don't Have An Account?{" "}
                  <Link className="text-red-700" to="/auth/login">Login</Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
