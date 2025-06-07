import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = (totalScroll / windowHeight) * 100;
    setScrollWidth(scroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
      <div className="sticky top-[64px] z-[999] w-full h-0.5 md:h-1 bg-transparent">
    <div
      className="h-full bg-amber-300 transition-[width] duration-500 ease-out"
      style={{ width: `${scrollWidth}%` }}
    ></div>
  </div>
  );
};

export default ScrollProgress;
