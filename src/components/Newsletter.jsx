import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import bgImg from '../assets/Hero/dark-mosaic.png'


const Newsletter = () => {
     const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email and agree to the terms.");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
}
    return (
        <div>
            <div className="flex items-center justify-center min-h-[27rem] md:min-h-[32rem] bg-white text-white px-4 ">
      <Toaster />
      <div style={{ backgroundImage: `url(${bgImg})` }}  className="bg-black text-white p-8 md:p-25  shadow-xl flex flex-col md:flex-row gap-8 max-w-7xl w-full">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold md:text-end md:pr-18 lg:pr-35">
            Subscribe to our <br /> <span className=' text-end'>Newsletter</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-transparent border-b-2 border-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          
          <button type="submit" className="text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400

           group relative inline-flex h-8 items-center justify-center overflow-hidden bg-neutral-950"><span>Subscribe</span><div class="ml-1 transition duration-300 group-hover:rotate-[360deg]"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
        </form>
      </div>
    </div>
        </div>
    );
};

export default Newsletter;