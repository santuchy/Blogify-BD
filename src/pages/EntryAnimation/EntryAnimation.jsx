import React, { useEffect, useState } from 'react';
import './EntryAnimation.css'


const EntryAnimation = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const alreadyVisited = localStorage.getItem('blogify_visited');

        if (!alreadyVisited && window.location.pathname === '/') {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                localStorage.setItem('blogify_visited', 'yes');
            }, 3000);
        }
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="w-full h-full relative">
              <div className="door-left bg-black/80 backdrop-blur-sm"></div>
                <div className="door-right bg-black/80 backdrop-blur-sm"></div>
            </div>
        </div>
    );
};

export default EntryAnimation;