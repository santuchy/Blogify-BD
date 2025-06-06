import React, { use, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import { AuthContext } from './../context/AuthProvider';




const Login = () => {

  const { signIn, googleSignIn, setUser } = use(AuthContext);

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log('Google Clicked');
    googleSignIn().then(result => {
      const user = result.user;
      setUser(user);
      navigate(`${location.state ? location.state : '/'}`)
    }).catch(error => {
      alert(error);
    })
  }




  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Login successful!");
        console.log(user);
        navigate(`${location.state ? location.state : "/"}`)

      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error("Login failed, Try again... ");
        // const errorMessage = error.message;
        // alert(errorCode, errorMessage)
        console.log(errorCode);

      })

  }



  return (
    <div className='flex justify-center p-5 items-center bg-gradient-to-b from-yellow-500 to-white'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Login your account</h2>

        




        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">

            <label className="label">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" />


            <label className="label">Password</label>
            <input name='password' type="password" className="input" placeholder="Password" />
            <div><a className="link link-hover">Forgot password?</a></div>
            <button type='submit' className="btn btn-neutral mt-4">Login</button>
            <p className='font-semibold text-center pt-5'>Don't Have An Account ? <Link className='text-red-700' to="/auth/register">Register</Link> </p>

            <div>
              <div className='card btn-wide w-full mx-auto gap-5 py-5'>
          <button onClick={handleGoogleSignIn}
            aria-label='Login with Google' type='button' className="btn bg-white text-black border-black">
            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
        </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;