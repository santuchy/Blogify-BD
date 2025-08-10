import React from 'react';
import Lottie from 'lottie-react';
import loadingAnim from '../assets/Lottie/loading.json';

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Lottie
        animationData={loadingAnim}
        loop
        autoplay
        aria-label="Loading"
        className="w-36 h-36 md:w-44 md:h-44"
      />
    </div>
  );
};



export default Loading;
