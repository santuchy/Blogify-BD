import React from 'react';
import { useEffect, useState } from "react";

const CustomCursor = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div>
            <div
                className="pointer-events-none fixed z-[9999] w-8 h-8 border border-gray-200 rounded-full"
                style={{
                    left: position.x - 16,
                    top: position.y - 16,
                }}
            ></div>
            <div
                className="pointer-events-none fixed z-[9999] w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                    left: position.x - 4,
                    top: position.y - 4,
                }}
            ></div>
        </div>
    );
};

export default CustomCursor;